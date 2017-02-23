// @flow
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var electron = require('electron');

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

export default class App extends Component {
  props: {
    children: HTMLElement;
  };
  
  constructor(props) {
    super(props);
    this.state = {squares: []};
    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount() {
    console.log("Mounted, motherfucker!\n");
  };

  getInitialState() {
    return {squares:[]};
  };


  handleClick(e) {
    e.preventDefault();

    console.log(e);

    var updatedSquares = this.state.squares.slice();
    updatedSquares.push({x: e.clientX, y: e.clientY});
    
    this.setState({squares: updatedSquares})

    console.log(this.state);
  };

  render() {
    // Get the size of the app window in the component
    // TODO(carter): This is the screen width and height. Figure out
    // the width and height of this component.

    var primaryDisplay = electron.screen.getPrimaryDisplay();
    var windowHeight = primaryDisplay.size.height;
    var windowWidth = primaryDisplay.size.width;
    
    // Create the list of dots to add to the dot-grid
    var dotGrid = [];
    var i, j;
    for (i = 5; i < windowWidth; i += 15)
      for (j = 5; j < windowHeight; j += 15)
        dotGrid.push({x:i, y:j, r:.5, attr:{"stroke":"#00cc00","stroke-width":1,"fill":"#00cc00"}});
   
    var test = 100;

    return (
      <div onClick={this.handleClick}>
        <Paper width={windowWidth} height={windowHeight}>
          <Set>    
            {
                dotGrid.map(function(ele,pos){
                    return (<Circle key={pos} x={ele.x} y={ele.y} r={ele.r} attr={ele.attr}/>)
                })
            }
          </Set>
        </Paper>
      </div>);
  }
}
