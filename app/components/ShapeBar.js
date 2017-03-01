// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

import ShapeOption from './ShapeOption';

export default class ShapeBar extends Component {
  
  render() {
    return (
      <div style={{position: 'absolute', backgroundColor: 'red', width: '100%', height: '10%', margin: 0, padding: 0}}>
        <ShapeOption />
        <ShapeOption />
        <ShapeOption />
        <ShapeOption />
        <ShapeOption />
        <ShapeOption />
      </div>);
  }
}
