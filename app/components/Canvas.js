// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

import DotGrid from './DotGrid'
import Diagram from './Diagram'

export default class Canvas extends Component {
  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '90%', margin: 0, padding: 0, top: '10%'}}>
        <DotGrid />
        <Diagram />
      </div>);
  }
}
