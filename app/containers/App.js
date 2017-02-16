// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    // Create the list of dots to add to the dot-grid
    var data = [];
    var i, j;
    for (i = 5; i < 300; i += 15)
      for (j = 5; j < 300; j += 15)
        data.push({x:i, y:j, r:.5, attr:{"stroke":"#00cc00","stroke-width":1,"fill":"#00cc00"}});
    
    return (
      <div>
        <Paper width={300} height={300}>
          <Set>    
            {
                data.map(function(ele,pos){
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
