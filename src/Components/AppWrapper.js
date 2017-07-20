import React from 'react';
import TableComponent from './TableComponent';
import TreeTableComponent from './TreeTableComponent'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AutoCompleteComponent from './AutoCompleteComponent';


import AttributeMenu from './AttributeMenu'

import MenuComponent from './MenuComponent'

import tableData from '../Data/SampleNhanes.json';

import DrawerComponent from './DrawerComponent'


import refs from '../Data/referenceValues.json'


import RadioButtonComponent from './RadioButtonComponent'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

{/*
import ToolbarComponent from './ToolbarComponent';
import TabComponent from './TabComponent';
*/}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class AppWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleTableSelection = this.handleTableSelection.bind(this);

    var filtData = tableData.map((el)=>{el.selected = false; return el}).slice(1, 100);

    

    this.state = {
      allData:tableData.map((el)=>{el.selected = false; return el}),
      filteredData: filtData,
      name:'',
      city:'',
      category:'',
      selectedCompany:null,
      height:filtData.length * 55 + 0
    }; 
  }



  handleTableSelection = (selectedCompany) =>{
    this.setState(function (state, props) {
      if (selectedCompany.length>0){
        state.filteredData[selectedCompany[0]].selected = true;
      }
      console.log('setting selected state')
    
       return {
        filteredData: state.filteredData
       }
      });
  };

  groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

  handleChange = (value,field) => {
    this.setState(function (state, props) {
      const possibleValues = tableData.filter((rowItem)=>{return rowItem[field] === value})
       {/*filteredData: possibleValues.length>0 ? possibleValues : tableData,*/}
       return {
        filteredData: value ? possibleValues : tableData
       }
      });
  };


  render() {

    var clusterData = this.groupBy(this.state.filteredData,'RIDAGEYR');

    return (

      <div style={{width: '90%',  margin:'auto', height:'1200px', 'overflowY':'scroll'}}>

         <linearGradient id="linear-gradient">
      <stop offset="14%" stopColor="#2f343b" stopOpacity="0%"/>
      <stop offset="43%" stopColor="#337082" stopOpacity="41%"/>
      <stop offset="67%" stopColor="#369fb9" stopOpacity="73%"/>
      <stop offset="79%" stopColor="#37b1cf" stopOpacity="85%"/>        
      </linearGradient>

      <Paper style={{margin: '16px 5px 16px 5px'}} zDepth={1}>

      <div style={{padding:'0px' , display:'inline-block', width:'100%'}}>

      <AttributeMenu attributes={this.state.filteredData[0]} allData = {this.state.filteredData}/>
         
        <TableComponent title={'Clinical Data'} data={this.state.filteredData} onRowSelect={this.handleTableSelection} refs={refs} height={ this.state.height + 'px'}>
        
        </TableComponent>
     
     </div>
        </Paper> 
      
      </div>


      );
  }
}