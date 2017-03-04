// @flow
import React, { Component } from 'react';
import ReactDom from 'react-dom';
var ReactDOM = require('react-dom');
var electron = require('electron');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class Diagram extends Component {
  constructor(props) {
    super (props);
    
    this.state = {
      blocks: [],  // Top-left (x,y) coordinates of each block in the diagram
      connections: [],  // Start and end IDs of connection points
    };

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    // On a click, add a block to the diagram on the click location
    e.preventDefault();

    // Find the location of the nearest click
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Find the location of this click relative to the element itself
    const topLeftX = clickX;
    const topLeftY = clickY;
    
    console.log(topLeftX);
    console.log(topLeftY);
    // Add this (x,y) location as an object to the blocks list in state
    let updatedBlocks = this.state.blocks.slice();  // immutable lists in state
    updatedBlocks.push({x: topLeftX, y:topLeftY});

    this.setState({
      blocks: updatedBlocks,
      connections: this.state.connections,
    });
    
    console.log(updatedBlocks); // Debugging
  };

  render() {
    return (
      <div onClick={this.handleClick} 
           style={{position: 'absolute', width: '100%', height: '100%', margin: 0, padding: 0}}>
        <Paper width='100%' height='100%'>
          <Set>
            {
              this.state.blocks.map(function(ele, pos) {
                return (
                  <Rect 
                    key={pos} x={ele.x} y={ele.y} width={30} height={30}
                    attr={{
                      "stroke":"#f45642",
                      "stroke-width":1,
                      "fill":"#f45642"
                    }}
                  />
                )
              })
            }
          </Set>
        </Paper>
        <div></div>
      </div>);
  }
}
