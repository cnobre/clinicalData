import React from 'react';
import TableComponent from './TableComponent';
import TreeTableComponent from './TreeTableComponent'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AutoCompleteComponent from './AutoCompleteComponent';

import MenuComponent from './MenuComponent'

import tableData from '../Data/TenFamiliesDescendAnon.json';

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

      <div style={{width: '90%',  margin:'auto', height:'1000px', 'overflow-y':'scroll'}}>

      <div style={{padding:'0px' , display:'inline-block', width:'30%'}}>
       <Paper style={{margin: '16px 0px 16px 5px'}} zDepth={1}> 
<TreeTableComponent title={'Tree'} data={this.state.filteredData} onRowSelect={this.handleTableSelection} refs={refs} height={'700px'}/>
        </Paper> 
      </div>
      <div style={{padding:'0px' , display:'inline-block', width:'70%'}}>
          <Paper style={{margin: '16px 5px 16px 5px'}} zDepth={1}> 
        <TableComponent title={'Clinical Data'} data={this.state.filteredData} onRowSelect={this.handleTableSelection} refs={refs} height={'700px'}>
        <RadioButtonComponent/>
        </TableComponent>
        </Paper> 
     </div>
      
      </div>


      );
  }
}