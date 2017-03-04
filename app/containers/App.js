// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

import Canvas from '../components/Canvas'; 
import ShapeBar from '../components/ShapeBar';

export default class App extends Component {
  props: {
    children: HTMLElement;
  };
  
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <ShapeBar />
        <Canvas />
      </div>);
  }
}
