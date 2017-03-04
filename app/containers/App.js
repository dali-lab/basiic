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

    this.state = {
      shape: 'Rect',
    };

    this.onShapeOptionClick = this.onShapeOptionClick.bind(this);
  };

  // Handle ShapeOption Click
  onShapeOptionClick(component, e) {
    // Set the state of the app based on the option click
    console.log("Before: This.state: %s\n", this.state.shape);

    if (component.props.option == 'Rect') {
      this.setState({shape: 'Rect'});
    } else if (component.props.option == 'Circle') {
      this.setState({shape: 'Circle'});
    }

    console.log("Handling Shape Option Click!\n");
  };

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <ShapeBar onShapeOptionClick={this.onShapeOptionClick} shape={this.state.shape}/>
        <Canvas shape={this.state.shape}/>
      </div>);
  }
}
