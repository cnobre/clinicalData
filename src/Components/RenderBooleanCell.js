import React from 'react';
import * as d3 from 'd3';

var margin = 10;

export default class RenderBooleanCell extends React.Component {

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
        <rect x={this.props.width/2-this.props.height/3} width={this.props.height/1.5} height={this.props.height/1.5}  fill='#969696' opacity={(this.props.data === 'Y' || this.props.data === 'true') ? 1 : '.2'}/>
      </svg>
    )
  }
}

// Specifies the default values for props:
RenderBooleanCell.defaultProps={
  refs:null,
    highColor:'#bc3a20',
  lowColor:'#3b6799',
  height:30,
  width:100
};
