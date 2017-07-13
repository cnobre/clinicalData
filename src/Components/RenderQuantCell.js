import React from 'react';
import * as d3 from 'd3';

var margin = 10;

export default class RenderQuantCell extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
        max:null,
        min:null,
        scale: null,
        range:null,
    }

  }

  componentWillMount() {

    var max = d3.max(this.props.dataVector, (d)=>{return d[this.props.field] !== 'NA' ? d[this.props.field] : 0}) 
    var min = d3.min(this.props.dataVector, (d)=>{return d[this.props.field] !== 'NA' ? d[this.props.field] : 0}) 
    var sizeScale = d3.scaleLinear().range([margin, this.props.width-margin]).domain([min,max]);

    var refRange = null; 
    if (this.props.refs[this.props.field]){

    	 refRange = JSON.parse("[" + this.props.refs[this.props.field] + "]")[0];
    	 sizeScale.domain([d3.min([min,refRange[0]*.8]), d3.max([max,refRange[1]*1.5])])
    }
    
    this.setState({scale:sizeScale, range:refRange, max:max, min:min});
  }


  render() {

     var {
    percent = 0,         // a number between 0 and 1, inclusive
    width = 65,         // the overall width
    height = 20,         // the overall height
    rounded = true,      // if true, use rounded corners
    color = "#0078bc",   // the fill color
    animate = false,     // if true, animate when the percent changes
    label = null         // a label to describe the contents (for accessibility)
  } = this.props;

  var r = rounded ? Math.ceil(height / 2) : 0;
  var w = percent ? Math.max(height, width * Math.min(percent/this.state.max, 1)): 0;
  var style = animate ? { "transition": "width 500ms, fill 250ms" } : null;

  return (
    <svg width={width} height={height} aria-label={label} >
      <rect width={width} height={height} fill="#ccc" rx={r} ry={r} data-tooltip={label}/>
      <rect width={w} height={height} fill={color} rx={r} ry={r} style={style} data-tooltip={label}/>
    </svg>
  );


   
  }
}

// Specifies the default values for props:
RenderQuantCell.defaultProps={
      percent: 0,         // a number between 0 and 1, inclusive
      rounded :true,      // if true, use rounded corners
      color :"#0078bc",   // the fill color
      animate : false,     // if true, animate when the percent changes
      label :null,        // a label to describe the contents (for accessibility)
       refs : null,
      highColor : '#bc3a20',
    lowColor : '#3b6799',
    height : 30,
    width : 100,
  refs:null,
    highColor:'#bc3a20',
  lowColor:'#3b6799',
  height:30,
  width:100
};
