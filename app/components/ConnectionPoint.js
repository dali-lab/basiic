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
      hide: false,
    };
  };

  render() {
    // Use an offset of half the width from the (x,y) center points
    let size = 8;
    let tlx = this.props.x - (size / 2);
    let tly = this.props.y - (size / 2);

    console.log("Rendering CP (id: %s) at %d, %d\n", this.props.id, this.props.x, this.props.y);
    return (
        <Rect x={tlx} y={tly} width={size} height={size} hide={this.state.hide}
          attr={{
            "stroke":"#00FFFF",
            "stroke-width":1,
            "fill":"#00FFFF",
          }}
        />);
  };
}
