import React from 'react';
import * as d3 from 'd3';

var margin = 10;

export default class RenderQuantCell extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
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
    
    this.setState({scale:sizeScale, range:refRange});
  }


  render() {

    return (
     <svg width={this.props.width} height={this.props.height} style={{display:'block', margin:'auto', margin:'auto', 'margin-top':'5px', 'margin-bottom':'5px'}}>
      	<rect x={this.props.data !== 'NA' ? 0: this.props.width/3} y = {this.props.data !== 'NA' ? 0 : this.props.height/2 } width={this.props.data !== 'NA' ? this.props.width : this.props.width/3} height={this.props.data !== 'NA' ? this.props.height: this.props.height/5} fill={this.props.data !== 'NA' ? '#f4f4f4' : '#cccccc'}/>
       <rect x={this.state.range ? this.state.scale(this.state.range[1]) : 0 } width={this.state.range && this.props.data>this.state.range[1] ? this.state.scale.domain()[1]-this.state.scale(this.state.range[1]) : 0} height={this.props.height}  fill={this.props.highColor} opacity='.1'/>
        <rect x={0} width={this.state.range && this.props.data<this.state.range[0] ? this.state.scale(this.state.range[0]) : 0} height={this.props.height}  fill={this.props.lowColor} opacity='.1'/>
        {/*<rect x={this.state.range ? this.state.scale(this.state.range[0]) : 0 } width ={this.state.range ? 2 : 0} height={this.state.height}  fill='#969696' opacity='.5'/>
        <rect x={this.state.range ? this.state.scale(this.state.range[1]) : 0 } width ={this.state.range ? 2 : 0} height={this.state.height}  fill='#969696' opacity='.5'/>*/}
        <rect x={this.state.range ? this.state.scale(this.state.range[0]) : 0 } width={this.state.range? this.state.scale(this.state.range[1])-this.state.scale(this.state.range[0]) : 0} height={this.props.height}  fill='#969696' opacity='.2'/>
      
      <circle cy={this.props.height/2} cx={this.state.scale(this.props.data) ? this.state.scale(this.props.data) : 0 } r={this.props.data !== 'NA' ? this.props.height/6 : 0}  fill={this.state.range ? (this.props.data>this.state.range[1] ? this.props.highColor : (this.props.data<this.state.range[0] ? this.props.lowColor : '#8b8d8e')) : '#8b8d8e'}/>
         {/*<text x={0} y={25} fill='#8b8d8e'>{this.props.data}</text>*/}
      </svg>
    )
  }
}

// Specifies the default values for props:
RenderQuantCell.defaultProps={
  refs:null,
    highColor:'#bc3a20',
  lowColor:'#3b6799',
  height:30,
  width:100
};
