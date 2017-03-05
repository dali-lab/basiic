// @flow
import React, { Component } from 'react';
import ReactDom from 'react-dom';
var ReactDOM = require('react-dom');
var electron = require('electron');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class Diagram extends Component {
  constructor(props) {
    super (props);
    
    this.state = {
      circles: [],  // Information needed to build a circle block
      squares: [], // Information needed to build a square block
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
    if (this.props.shape == 'Rect') {
      // Get the width of the shape if it's a square
      let width = 30;
      // Center the square
      topLeftX -= (width / 2); 
      topLeftY -= (width / 2);

      // Add this (x,y) location as an object to the blocks list in state
      let updatedBlocks = this.state.squares.slice();  // immutable lists in state
      updatedBlocks.push({x: topLeftX, y:topLeftY});

      this.setState({
        circles: this.state.circles,
        squares: updatedBlocks,
        connections: this.state.connections,
      });
    }
    
    if (this.props.shape == 'Circle') {
      // Add this (x,y) location as an object to the blocks list in state
      let updatedBlocks = this.state.circles.slice();  // immutable lists in state
      updatedBlocks.push({x: topLeftX, y:topLeftY});

      this.setState({
        circles: updatedBlocks,
        squares: this.state.squares,
        connections: this.state.connections,
      });
    }
    
    console.log(this.props.shape);
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
                    key={pos} x={ele.x} y={ele.y} width={30} height={30}
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
                    key={pos} x={ele.x} y={ele.y} r={15}
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
