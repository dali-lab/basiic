// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

// const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class Diagram extends Component {
  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <div></div>
      </div>);
  }
}
