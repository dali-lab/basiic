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
      strSize: 'Small',
      size: 30,
    };

    this.onShapeOptionClick = this.onShapeOptionClick.bind(this);
  };

  // Handle ShapeOption Click
  onShapeOptionClick(component, e) {
    // Set the state of the app based on the option click
    console.log("Before: Shape: %s, Size: %s\n", this.state.shape, this.state.size);

    // Check for various known options
    
    switch(component.props.option) {
      // Two cases for shapes
      case 'Rect':
        this.setState({
          shape: 'Rect',
          strSize: this.state.strSize,
          size: this.state.size,
        });
        break;

      case 'Circle':
        this.setState({
          shape: 'Circle',
          strSize: this.state.strSize,
          size: this.state.size,
        });
        break;

      case 'Small':
        this.setState({
          shape: this.state.shape,
          strSize: component.props.option,
          size: 30,
        });
        break;

      case 'Medium':
        this.setState({
          shape: this.state.shape,
          strSize: component.props.option,
          size: 60,
        });
        break;

      case 'Big':
        this.setState({
          shape: this.state.shape,
          strSize: component.props.option,
          size: 90,
        });
        break;

      case 'Fricken Huge':
        this.setState({
          shape: this.state.shape,
          strSize: component.props.option,
          size: 120,
        });
        break;

      default:
        console.log("Unhandled Button: %s\n", component.props.option);
    }

    console.log("Handling Shape Option Click!\n");
  };

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <ShapeBar onShapeOptionClick={this.onShapeOptionClick} shape={this.state.shape} strSize={this.state.strSize}/>
        <Canvas shape={this.state.shape} size={this.state.size}/>
      </div>);
  }
}
