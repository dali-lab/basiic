// @flow
import React, { Component } from 'react';
import ReactDom from 'react-dom';
var ReactDOM = require('react-dom');
var electron = require('electron');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

// Use Cantor's pairing function to generate unique keys for connection points.
function key (a, b) {
  let cantor = ((a + b) * (a + b + 1) / 2) + a;
  console.log("Cantor of %d and %d is %d\n", a, b, cantor);
  return parseInt(cantor);
};

export default class Diagram extends Component {
  constructor(props) {
    super (props);
    
    this.state = {
      circles: [],  // Information needed to build a circle block
      squares: [], // Information needed to build a square block
      connectionPoints: {}, // Points at which a connection point can be built
      connections: [],  // Start and end IDs of connection points
    };

    this.handleClick = this.handleClick.bind(this);
  };


  handleClick(e) {
    // On a click, add a block to the diagram on the click location
    e.preventDefault();

    // Find the location of the nearest click
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Find the location of this click relative to the element itself
    // NOTE FOR FUTURE DEVS: This offset was figured out via guess and check
    //  since we have a quick deadline coming up. This is not reactive and is
    //  a horrible best practice. Change this to compute the offset on the fly.
    let topLeftX = clickX - 8;
    let topLeftY = clickY - 75;
    
    // Snap the blocks to the grid. There is an offset of five in each
    // direction, and then the pixel value should be a multiple of 15.
    // Use modular arithmetic to round to the nearest value
    let snappedX = topLeftX - 5;
    let snappedY = topLeftY - 5;

    if ((snappedX % 15) != 0) { // They didn't hit exactly on a dot
      if ((snappedX % 15) <= 7) { // Round down
        snappedX -= (snappedX % 15);
      } else { // Round up
        snappedX += (15 - (snappedX % 15));
      }
    }
    topLeftX = snappedX + 5;
    
    if ((snappedY % 15) != 0) { // They didn't hit exactly on a dot
      if ((snappedY % 15) <= 7) { // Round down
        snappedY -= (snappedY % 15);
      } else { // Round up
        snappedY += (15 - (snappedY % 15));
      }
    }
    topLeftY = snappedY + 5;

    console.log(topLeftX);
    console.log(topLeftY);

    // Add a new Rectangle
    if (this.props.shape == 'Rect') {
      // Center the square
      topLeftX -= (this.props.size / 2); 
      topLeftY -= (this.props.size / 2);

      // Generate Connection points for the square along the edges
      // This ES6 vodoo deconstructs the object to make a copy. Kind of.
      let newConnectPoints = {...this.state.connectionPoints};

      // Add Edge 1
      let tlx = topLeftX;
      let tly = topLeftY + (this.props.size / 2);
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }

      // Add Edge 2
      tlx = topLeftX + (this.props.size / 2);
      tly = topLeftY;
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }

      // Add Edge 3
      tlx = topLeftX + (this.props.size / 2);
      tly = topLeftY + this.props.size;
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }

      // Add Edge 4
      tlx = topLeftX + this.props.size;
      tly = topLeftY + (this.props.size / 2);
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }
      
      // Add this (x,y) location as an object to the blocks list in state
      let updatedBlocks = this.state.squares.slice();  // immutable lists in state
      updatedBlocks.push({x: topLeftX, y:topLeftY, size:this.props.size});

      this.setState({
        circles: this.state.circles,
        squares: updatedBlocks,
        connectionPoints: newConnectPoints,
        connections: this.state.connections,
      });
    }
    
    // Add a new circle
    if (this.props.shape == 'Circle') {
      // Add this (x,y) location as an object to the blocks list in state
      let updatedBlocks = this.state.circles.slice();  // immutable lists in state
      
      // Circle size is measured in radius: divide by two
      updatedBlocks.push({x: topLeftX, y:topLeftY, size:(this.props.size / 2)});

      // Generate Connection points for the circle along the edges
      // This ES6 vodoo deconstructs the object to make a copy. Kind of.
      let newConnectPoints = {...this.state.connectionPoints};

      // Add Edge 1
      let tlx = topLeftX - (this.props.size / 2);
      let tly = topLeftY;
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }

      // Add Edge 2
      tlx = topLeftX;
      tly = topLeftY - (this.props.size / 2);
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }

      // Add Edge 3
      tlx = topLeftX;
      tly = topLeftY + (this.props.size / 2);
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }

      // Add Edge 4
      tlx = topLeftX + (this.props.size / 2);
      tly = topLeftY;
      newConnectPoints[key(tlx, tly)] = { x: tlx, y:tly }

      this.setState({
        circles: updatedBlocks,
        squares: this.state.squares,
        connectionPoints: newConnectPoints,
        connections: this.state.connections,
      });
    }
    
    console.log(this.state);
  };

  render() {
    return (
      <div onClick={this.handleClick} 
           style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <Paper position='absolute' width={615} height={608}>
          <Set>
            {
              this.state.squares.map(function(ele, pos) {
                return (
                  <Rect
                    key={pos} x={ele.x} y={ele.y} width={ele.size} height={ele.size}
                    attr={{
                      "stroke":"#f45642",
                      "stroke-width":1,
                      "fill":"#f45642"
                    }}
                  />
                )
              })
            }
            {
              this.state.circles.map(function(ele, pos) {
                return (
                  <Circle 
                    key={pos} x={ele.x} y={ele.y} r={ele.size}
                    attr={{
                      "stroke":"#f45642",
                      "stroke-width":1,
                      "fill":"#f45642"
                    }}
                  />
                )
              })
            }
          </Set>
        </Paper>
        <div></div>
      </div>);
  }
}
