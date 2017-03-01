// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

import Canvas from '../components/Canvas'; 
import ShapeBar from '../components/ShapeBar';

// const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class App extends Component {
  props: {
    children: HTMLElement;
  };
  
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div style={{position: 'absolute', backgroundColor: 'green', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <ShapeBar />
        <Canvas />
      </div>);
  }
}
