// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

export default class DotGrid extends Component {
  render() {
    // Use a SVG patter to create a DotGrid 
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <svg style={{position: 'relative', height: '100%', width: '100%'}}>
          <defs>
             <pattern id="dots-15-15" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <circle style={{stroke:"none", fill:"#00cc00"}} cx="5" cy="5" r=".5"/>
             </pattern>
          </defs>
          <rect x="1" y="1" height="100%" width="100%" style={{strokeWidth:"1", stroke:"black", fill:"url(#dots-15-15)"}} />
        </svg>
      </div>);
  }
}
