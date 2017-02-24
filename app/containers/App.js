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

    var primaryDisplay = electron.screen.getPrimaryDisplay();
    var windowHeight = primaryDisplay.size.height;
    var windowWidth = primaryDisplay.size.width;
    
    // Create the list of dots to add to the dot-grid
    var dots = [];
    var i, j;
    for (i = 5; i < windowWidth; i += 15)
      for (j = 5; j < windowHeight; j += 15)
        dots.push({x:i, y:j, r:.5, attr:{"stroke":"#00cc00","stroke-width":1,"fill":"#00cc00"}});

    this.state = {offset: 5, gridSize: 15, dotGrid: dots, squares: []};
    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount() {
    console.log("Mounted\n");
  };

//  getInitialState() {
//    return {offset: 5, gridsize: 15, squares: []};
//  };


  handleClick(e) {
    e.preventDefault();

    console.log(e);
    // Calculate the nearest dot on the grid to snap to
    var topLeftX = 50;
    var minDistX = 10000;
    var topLeftY = 50;
    var minDistY = 10000;

    var clickX = e.clientX;
    var clickY = e.clientY;

    for (var i = 0; i < this.state.dotGrid.length; i++) {
      var dot = this.state.dotGrid[i];
      var distX = Math.abs(clickX - dot.x);
      if (distX < minDistX) {
        topLeftX = dot.x;
        minDistX = distX;
      }

      var distY = Math.abs(clickY - dot.y);
      if (distY < minDistY) {
        topLeftY = dot.y;
        minDistY = distY;
      }
    }

//  if (e.clientX % this.state.gridSize <= 7) {
//    topLeftX = e.clientX - (e.clientX % this.state.gridSize);
//  } else {
//    topLeftX = e.clientX + (this.state.gridSize - (e.clientX % this.state.gridSize));
//  }

//  if (e.clientY % this.state.gridSize <= 7) {
//    topLeftY = e.clientY - (e.clientX % this.state.gridSize);
//  } else {
//    topLeftY = e.clientY + (this.state.gridSize - (e.clientY % this.state.gridSize));
//  }

    // Update the state by adding this square to the grid
    var updatedSquares = this.state.squares.slice();
    updatedSquares.push({x: topLeftX, y: topLeftY});

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
   
    var test = 100;

    var squareList = [];
    for (var i = 0; i < this.state.squares.length; i++) {
      squareList.push({x: this.state.squares[i].x, y: this.state.squares[i].y, height: 30, width: 30, round: 3,
        attr:{"stroke":"#f45642","stroke-width":1,"fill":"#f45642"}});
    }

    return (
      <div onClick={this.handleClick}>
        <Paper width={windowWidth} height={windowHeight}>
          <Set>    
            {
                this.state.dotGrid.map(function(ele,pos){
                    return (<Circle key={pos} x={ele.x} y={ele.y} r={ele.r} attr={ele.attr}/>)
                })
            }
          </Set>
          <Set>
            {
                squareList.map(function(ele,pos){
                    return (<Rect key={pos} x={ele.x} y={ele.y} width={ele.width} height={ele.height} attr={ele.attr}/>)
                })
            }
          </Set>
        </Paper>
      </div>);
  }
}
