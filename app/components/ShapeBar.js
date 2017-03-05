// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

import ShapeOption from './ShapeOption';

export default class ShapeBar extends Component {
  // Props: onShapeOptionClick, shape, strSize
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div style={{position: 'absolute', backgroundColor: 'red', width: '100%', height: '10%', margin: 0, padding: 0}}>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} strSize={this.props.strSize} option='Rect'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} strSize={this.props.strSize} option='Circle'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} strSize={this.props.strSize} option='Small'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} strSize={this.props.strSize} option='Medium'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} strSize={this.props.strSize} option='Big'/>
        <ShapeOption onClick={this.props.onShapeOptionClick} shape={this.props.shape} strSize={this.props.strSize} option='Fricken Huge'/>
      </div>);
  }
}
