// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class Canvas extends Component {
  // Props: onClick, shape, size, and option
  constructor(props) {
    super(props);
  };

  render() {
    // If this ShapeOption is currently set, render it with a different color
    let buttonColor = 'grey';

    if (this.props.option == this.props.shape
        || this.props.option == this.props.strSize)
      buttonColor = 'aquamarine';

    return (
      <div onClick={this.props.onClick.bind(null, this)}
          style={{position: 'relative', float: 'left', backgroundColor: buttonColor, width: '10%', height: '90%', marginLeft: '5%', marginTop: '0.5%'}}>
        <p>{this.props.option}</p>
      </div>);
  }
}
