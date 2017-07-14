import React from 'react';
import * as d3 from 'd3';

let margin = 10;

export default class RenderColSummary extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      scale: null,
      range:null,
      histogram:null,
      histScale:null
  }
  }

  componentWillMount() {

    var max = d3.max(this.props.dataVector, (d)=>{return d[this.props.field] !== 'NA' ? d[this.props.field] : 0}) 
    var min = d3.min(this.props.dataVector, (d)=>{return d[this.props.field] !== 'NA' ? d[this.props.field] : 0}) 
    var sizeScale = d3.scaleLinear().range([margin,this.props.width-margin]).domain([min,max]);

    var refRange = null; 
    if (this.props.refs && this.props.refs[this.props.field]){
       refRange = JSON.parse("[" + this.props.refs[this.props.field] + "]")[0];
       sizeScale.domain([d3.min([min,refRange[0]*.8]), d3.max([max,refRange[1]*1.5])])
    }

    var histogram = d3.histogram()
    .value((d)=>{ return d[this.props.field]})
    .domain(sizeScale.domain())
    .thresholds(10)

    var minCount = d3.min(histogram(this.props.dataVector).map((bin)=>{return bin.length}));
    var maxCount = d3.max(histogram(this.props.dataVector).map((bin)=>{return bin.length}));

    var histScale = d3.scaleLinear().range([0,40]).domain([minCount,maxCount]);
    
    this.setState({scale:sizeScale, range:refRange, histogram:histogram, histScale:histScale});
  }


  render() {

    var hist = this.state.histogram(this.props.dataVector,(d)=>{return d[this.props.field]});

    return (
      <svg width={this.props.width} height={50} style={{display:'block', margin:'10 0 0 0 '}}>
        {hist.map((bin,i)=>{
       return (<rect key={this.props.field + i} x={this.state.scale(bin.x0)} y={40 - this.state.histScale(bin.length)} data-tooltip={'Value:' + bin.x0 + ' \n Patients:' + bin.length} width={this.props.width/20} height={this.state.histScale(bin.length)} fill={this.state.range && bin.x0>this.state.range[1] ? "indianred" : '#666666'} opacity='1'/>)
    })}

        <rect x={0} y={40} width={this.props.width} height={2} fill='#cecece' opacity='1'/>
      </svg>
    )
  }
}


// Specifies the default values for props:
RenderColSummary.defaultProps = {
  refs:null,
  width:100
};

