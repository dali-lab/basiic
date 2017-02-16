// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    // Get the size of the app window in the component
    var primaryDisplay = electron.screen.getPrimaryDisplay();
    var windowHeight = primaryDisplay.size.height;
    var windowWidth = primaryDisplay.size.width;
    
    console.log("Height: %d", windowHeight);
    console.log("Width: %d", windowWidth);

    // Create the list of dots to add to the dot-grid
    var dotGrid = [];
    var i, j;
    for (i = 5; i < 300; i += 15)
      for (j = 5; j < 300; j += 15)
        dotGrid.push({x:i, y:j, r:.5, attr:{"stroke":"#00cc00","stroke-width":1,"fill":"#00cc00"}});
    
    return (
      <div>
        <Paper width={300} height={300}>
          <Set>    
            {
                dotGrid.map(function(ele,pos){
                    return (<Circle key={pos} x={ele.x} y={ele.y} r={ele.r} attr={ele.attr}/>)
                })
            }
          </Set>
          <Set>
          </Set>
        </Paper>
      </div>);
  }
}
