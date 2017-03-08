// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

import DotGrid from './DotGrid'
import Diagram from './Diagram'

export default class Canvas extends Component {
  // Has shape, size, clear, and onClear props
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '90%', margin: 0, padding: 0, top: '10%'}}>
        <DotGrid />
        <Diagram onClear={this.props.onClear} clear={this.props.clear} shape={this.props.shape} size={this.props.size}/>
      </div>);
  }
}
