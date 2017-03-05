// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class ConnectionPoint extends Component {
  // Props include id, x, and y.
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  };

  // Show the connection point only on mouseover
  onMouseOver(e) {
    this.setState({
      hide: false,
    });
  };

  // Once the user mouses out of the connection point, make it transparent
  onMouseOut(e) {
    this.setState({
      hide: true,
    });
  };

  render() {
    // Use an offset of half the width from the (x,y) center points
    let size = 8;
    let tlx = this.props.x - (size / 2);
    let tly = this.props.y - (size / 2);
    
    // Decide on the opacity of the svg based on state
    let opacity = '0.0'; // Completely invisible
    if (!this.state.hide)
      opacity = '1.0'; // Completely opaque

    return (
        <Rect x={tlx} y={tly} width={size} height={size} toBack={true}
          mouseover={this.onMouseOver} mouseout={this.onMouseOut}
          attr={{
            "stroke":"#00FFFF",
            "stroke-width":1,
            "fill":"#00FFFF",
            "opacity":opacity,
          }}
        />);
  };
}
