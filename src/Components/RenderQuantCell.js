import React from 'react';
import PropTypes from 'prop-types'
import * as d3 from 'd3';

var margin = 10;

function RangeRef (props) {

  var barHeight = props.height
  var height = props.height/2
  if (!props.refs){
    return null
  }

  return (  
    <svg>
      {/*<line x1={3} x2={props.scale(props.refs[0])} y1={height} y2={height} style={{stroke:'#8fc6e0', strokeWidth:barHeight, strokeLinecap:"round"}}/>
      <line  x1={props.scale(props.refs[1])}  x2={props.scale.range()[1]+7} y1={height} y2={height} style={{stroke:'#e09c8f', strokeWidth:barHeight, strokeLinecap:"round"}}/>*/}
      <line x1={props.scale(props.refs[0])} x2={props.scale(props.refs[1])} y1={height} y2={height} style={{stroke:'#bcbcbc', strokeWidth:barHeight}}/>
    </svg>
  )
}

function BoxPlot (props) {

  if(!props.x1 || !props.x2 || !props.x3 || !props.x4 || !props.x5){
    return null
  }
  return (
    <svg>
      <line x1={props.x1} x2={props.x5} y1={props.height/2} y2={props.height/2} style={{stroke:'#7f7f7f', strokeDasharray:"3"}}/>
      <line x1={props.x1} x2={props.x1} y1={props.height/2-2} y2={props.height/2+2} style={{stroke:'#7f7f7f'}}/>
      <line x1={props.x5} x2={props.x5} y1={props.height/2-2} y2={props.height/2+2} style={{stroke:'#7f7f7f'}}/>

      <rect x={props.x2} y={props.height/2-props.height*0.5/2} width={props.x4 - props.x2} height={props.height*0.5} fill="#a8a8a8" rx={0} ry={0} data-tooltip={props.label}/>
      <rect x={props.x3} y={props.height/2-props.height*0.5/2} width={3} height={props.height*0.5} fill="#e2e0e0"  data-tooltip={props.label}/>
      </svg>
  )
}

BoxPlot.defaultProps = {
  x1:0,
  x2:30,
  x3:60,
  x4:90,
  x5:100,
  height:100
};


export default class RenderQuantCell extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
        max:null,
        min:null,
        scale: null,
        range:null,
        quantiles:null,
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

    let values = this.props.dataVector.map((obj)=>{return +obj[this.props.field]}).sort((a,b)=>{return a-b});
    let quantiles = [
      d3.quantile(values, .25),
      d3.quantile(values, .5),
      d3.quantile(values, .75)
    ];
    
    this.setState({quantiles:quantiles, scale:sizeScale, range:refRange, max:max, min:min});
  }


  render() {

     var {
    percent = 0,         // a number between 0 and 1, inclusive
    width = 65,         // the overall width
    height = 5,         // the overall height
    rounded = false,      // if true, use rounded corners
    color = "#0078bc",   // the fill color
    animate = false,     // if true, animate when the percent changes
    label = null         // a label to describe the contents (for accessibility)
  } = this.props;

  var r = rounded ? Math.ceil(height / 2) : 0;
  var w = percent ? Math.max(height, width * Math.min(percent/this.state.max, 1)): 0;
  var style = animate ? { "transition": "width 500ms, fill 250ms" } : null;
 
  return (
    <svg width={width} height={height} aria-label={label} >
      <rect width={width} height={height} fill="#e2e0e0" rx={height/2} ry={height/2} data-tooltip={label}/>
      <RangeRef scale={this.state.scale} refs={this.state.range} height={height}/>
      <circle cx={this.state.scale(this.props.data) ? this.state.scale(this.props.data) : 0 } r={this.props.data !== 'NA' ? height/2.3 : 0} cy={height/2} fill={(this.state.range && this.props.data>this.state.range[1]) ? 'rgba(193, 66, 66, 0.7)' : 'rgba(8, 6, 6, 0.5)'} data-tooltip={label}/>

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
    highColor:'#bc3a20',
  lowColor:'#3b6799',
  height:15,
  width:100
};
