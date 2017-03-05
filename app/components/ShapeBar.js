// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

import ShapeOption from './ShapeOption';

export default class ShapeBar extends Component {
  // Props: onShapeOptionClick, shape
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div style={{position: 'absolute', backgroundColor: 'red', width: '100%', height: '10%', margin: 0, padding: 0}}>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} option='Rect'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} option='Circle'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} option='Small'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} option='Medium'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} option='Big'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} option='Fricken Huge'/>
      </div>);
  }
}
