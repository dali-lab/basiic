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
      clearSet: false, 
    };

    this.onShapeOptionClick = this.onShapeOptionClick.bind(this);
    this.clearCallback = this.clearCallback.bind(this);
  };

  // Handle having been cleared
  clearCallback() {
    // If this is being called, the diagram has just been cleared
    this.setState({
      shape: this.state.shape,
      strSize: this.state.strSize,
      size: this.state.size,
      clearSet: false, 
    });
  };

  // Handle ShapeOption Click
  onShapeOptionClick(component, e) {
    // Set the state of the app based on the option click
    switch(component.props.option) {
      // Two cases for shapes
      case 'Rect':
        this.setState({
          shape: 'Rect',
          strSize: this.state.strSize,
          size: this.state.size,
          clearSet: false, 
        });
        break;

      case 'Circle':
        this.setState({
          shape: 'Circle',
          strSize: this.state.strSize,
          size: this.state.size,
          clearSet: false, 
        });
        break;

      case 'Small':
        this.setState({
          shape: this.state.shape,
          strSize: component.props.option,
          size: 30,
          clearSet: false, 
        });
        break;

      case 'Medium':
        this.setState({
          shape: this.state.shape,
          strSize: component.props.option,
          size: 60,
          clearSet: false, 
        });
        break;

      case 'Big':
        this.setState({
          shape: this.state.shape,
          strSize: component.props.option,
          size: 90,
          clearSet: false, 
        });
        break;

      case 'Clear':
        this.setState({
          shape: this.state.shape,
          strSize: this.state.strSize,
          size: this.state.size,
          clearSet: true, 
        });
        break;

      default:
        console.log("Unhandled Button: %s\n", component.props.option);
    }
  };


  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <ShapeBar onShapeOptionClick={this.onShapeOptionClick} shape={this.state.shape} strSize={this.state.strSize}/>
        <Canvas onClear={this.clearCallback} clear={this.state.clearSet} shape={this.state.shape} size={this.state.size}/>
      </div>);
  }
}
