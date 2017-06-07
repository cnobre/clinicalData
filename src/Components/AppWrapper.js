import React from 'react';
import TableComponent from './TableComponent';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AutoCompleteComponent from './AutoCompleteComponent';

import MenuComponent from './MenuComponent'

import tableData from '../Data/smallData.json';

import DrawerComponent from './DrawerComponent'


import refs from '../Data/referenceValues.json'



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
    this.state = {
      allData:tableData.map((el)=>{el.selected = false; return el}),
      filteredData: tableData.map((el)=>{el.selected = false; return el}),
      name:'',
      city:'',
      category:'',
      selectedCompany:null
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
    return (

      <div style={{width: '80%',  margin:'auto', height:'300px', 'overflow-y':'scroll'}}>

      <div style={{margin:'0px' , display:'inline-block', width:'30%'}}>
       <Paper style={{margin: '16px 0px 16px 0px'}} zDepth={1}> 
<TableComponent title={'Tree'} data={this.state.filteredData} onRowSelect={this.handleTableSelection} refs={refs} height={'700px'}/>
        </Paper> 
      </div>
      <div style={{margin:'0px' , display:'inline-block', width:'60%'}}>
          <Paper style={{margin: '16px 0px 16px 0px'}} zDepth={1}> 
<TableComponent title={'Clinical Data'} data={this.state.filteredData} onRowSelect={this.handleTableSelection} refs={refs} height={'700px'}/>
        </Paper> 
     </div>
      
      </div>


      );
  }
}