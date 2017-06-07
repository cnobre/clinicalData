import React from 'react';
import * as d3 from 'd3';

	var highColor = '#bc3a20'
	var lowColor = '#3b6799'
	var height = 30;

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
    var sizeScale = d3.scaleLinear().range([10 , 90]).domain([min,max]);

    var refRange = null; 
    if (this.props.refs[this.props.field]){

    	 refRange = JSON.parse("[" + this.props.refs[this.props.field] + "]")[0];
    	 sizeScale.domain([d3.min([min,refRange[0]*.8]), d3.max([max,refRange[1]*1.5])])
    }
    
    this.setState({scale:sizeScale, range:refRange});
  }


  render() {


    return (
      <svg width={100} height={height} style={{display:'block', margin:'auto', margin:'auto', 'margin-top':'5px', 'margin-bottom':'5px'}}>
        

       {/*<text x={0} y={25} fill='#8b8d8e'>{this.props.data}</text>*/}
      	<rect width={100} height={height} fill='#f4f4f4'/>
        <rect x={this.state.range ? this.state.scale(this.state.range[1]) : 0 } width ={this.state.range && this.props.data>this.state.range[1] ? this.state.scale.domain()[1]-this.state.scale(this.state.range[1]) : 0} height={height}  fill={highColor} opacity='.1'/>
        <rect x={0} width ={this.state.range && this.props.data<this.state.range[0] ? this.state.scale(this.state.range[0]) : 0} height={height}  fill={lowColor} opacity='.1'/>
        {/*<rect x={this.state.range ? this.state.scale(this.state.range[0]) : 0 } width ={this.state.range ? 2 : 0} height={this.state.height}  fill='#969696' opacity='.5'/>
        <rect x={this.state.range ? this.state.scale(this.state.range[1]) : 0 } width ={this.state.range ? 2 : 0} height={this.state.height}  fill='#969696' opacity='.5'/>*/}
        <rect x={this.state.range ? this.state.scale(this.state.range[0]) : 0 } width ={this.state.range? this.state.scale(this.state.range[1])-this.state.scale(this.state.range[0]) : 0} height={height}  fill='#969696' opacity='.2'/>
     	<circle cy={height/2} cx={this.props.data !== 'NA' ? this.state.scale(this.props.data) : 0 } r={this.props.data !== 'NA' ? 5 : 0}  fill= {this.state.range ? (this.props.data>this.state.range[1] ? highColor : (this.props.data<this.state.range[0] ? lowColor : '#8b8d8e')) : '#8b8d8e'}/>
        
      </svg>
    )
  }
}

// Specifies the default values for props:
RenderQuantCell.defaultProps = {
  refs:null
};
