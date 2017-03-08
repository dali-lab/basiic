// @flow
import React, { Component } from 'react';
import ReactDom from 'react-dom';
var ReactDOM = require('react-dom');
var electron = require('electron');

import ConnectionPoint from '../components/ConnectionPoint';

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

// Use Cantor's pairing function to generate unique keys for connection points.
function key (a, b) {
  let cantor = ((a + b) * (a + b + 1) / 2) + a;
  return parseInt(cantor);
};

export default class Diagram extends Component {
  constructor(props) {
    super (props);
    
    this.state = {
      circles: [],  // Information needed to build a circle block
      squares: [], // Information needed to build a square block
      setConnectionPoint: null, // The connection point last clicked
      isConnecting: false, // The currently connection point
      connectionPoints: {}, // Points at which a connection point can be built
      connections: [],  // Start and end IDs of connection points
    };

    this.handleClick = this.handleClick.bind(this);
    this.createConnection = this.createConnection.bind(this);
  };

  createConnection(component, e) {
    // Stop default browser behavior and stop the event from propogating
    e.preventDefault();
    e.stopPropagation();

    // If not currently connection, start connecting
    if (this.state.setConnectionPoint == null ||
        !this.state.isConnecting) {
      console.log("Setting connection mode with starter point %s\n", component.props.id);
      this.setState({
        circles: this.state.circles,
        squares: this.state.squares,
        setConnectionPoint: component.props.id, // The connection point last clicked
        isConnecting: true, // The currently connection point
        connectionPoints: this.state.connectionPoints,
        connections: this.state.connections,
      });
    } else { // End the connection by adding a connection point
      // Get the current list of connections and add it to the state
      let updatedConnections = this.state.connections.slice();

      // Construct a path string that starts at the initial point
      let pathString = "M ";
      pathString += (
          this.state.connectionPoints[this.state.setConnectionPoint].x
      );
      pathString += ("," +
          this.state.connectionPoints[this.state.setConnectionPoint].y
      );

      // Draw a straight line to the second point
      pathString += " L ";
      pathString += (
          this.state.connectionPoints[component.props.id].x
      );
      pathString += ("," +
          this.state.connectionPoints[component.props.id].y
      );

      updatedConnections.push({
        start: this.state.setConnectionPoint,
        end: component.props.id,
        path: pathString,
      });
      
      console.log("Updated Connections:\n");
      console.log(updatedConnections);

      this.setState({
        circles: this.state.circles,
        squares: this.state.squares,
        setConnectionPoint: null, // The connection point last clicked
        isConnecting: false, // The currently connection point
        connectionPoints: this.state.connectionPoints,
        connections: updatedConnections,
      });
    }
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
        setConnectionPoint: null, // The connection point last clicked
        isConnecting: false, // The currently connection point
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
        setConnectionPoint: null, // The connection point last clicked
        isConnecting: false, // The currently connection point
        connectionPoints: newConnectPoints,
        connections: this.state.connections,
      });
    }
    
    console.log(this.state);
  };



  render() {
    // Get a copy of the connectionPoint object
    const connectionPoints = {...this.state.connectionPoints};
    const connectionFunction = this.createConnection;
    const connectionList = this.connections;

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
            {
              Object.keys(connectionPoints).map(function(key, pos) {
                return (
                  <ConnectionPoint
                    onClick={connectionFunction}
                    key={pos}
                    id={key}
                    x={connectionPoints[key].x}
                    y={connectionPoints[key].y}
                  />
                )
              })
            }
            {
              this.state.connections.map(function(ele, pos) {
                return (<Path key={pos} d={ele.path} />)
              })
            }
          </Set>
        </Paper>
        <div></div>
      </div>);
  }
}
