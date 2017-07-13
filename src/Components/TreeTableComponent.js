import React from 'react';

import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import {grey500, blueGrey700} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

import RenderTreeRow from './RenderTreeRow'
import RenderColSummary from './RenderColSummary'



import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const DownIcon = (props) => (
  <SvgIcon {...props}>
     <path d="M7 14l5-5 5 5z"/>
  </SvgIcon>
);

const UpIcon = (props) => (
  <SvgIcon {...props}>
     <path d="M7 10l5 5 5-5z"/>
  </SvgIcon>
);


const iconStyles = {
  marginRight: -7,
};

export default class TreeTableComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     fixedHeader: true,
     fixedFooter: false,
     stripedRows: false,
     showRowHover: true,
     selectable: true,
     multiSelectable: false,
     enableSelectAll: true,
     deselectOnClickaway: false,
     showCheckboxes: false,
     showTooltip:true,
     selectedRows:[],
     preScanRows:false,
     data:this.props.data,
     height: this.props.height};
   }


   handleSort = (direction,field) => {
    this.setState(function (state, props) {
      const sortedData = state.data.sort((a,b)=>{return direction === 'up' ? a[field]-b[field] : b[field]-a[field]})
       return {
        data: sortedData
       }
      });
  };


   render() {

    let tableData = this.props.data 

    return (

      (tableData[0] != null) ? 
      <div style={{width: '100%',margin: 'auto'}}>

      <Table
      height={this.state.height}
      fixedHeader={this.state.fixedHeader}
      fixedFooter={this.state.fixedFooter}
      
      selectable={this.state.selectable}
      multiSelectable={this.state.multiSelectable}
      bodyStyle={{'overflow-x':'scroll', 'overflow-y':'visible'}}
      style={{tableLayout: 'auto'}} 
      >
      {/*
        
      onRowSelection={(selection)=>{this.setState({selectedRows: selection}); this.props.onRowSelect(selection)}} 
    */}  
      <TableHeader
      displaySelectAll={this.state.showCheckboxes}
      adjustForCheckbox={this.state.showCheckboxes}
      enableSelectAll={this.state.enableSelectAll}
      >
      <TableRow>
      <TableHeaderColumn colSpan={Object.keys(tableData[0]).length} style={{textAlign: 'center'}}>
      {this.props.title} 
      </TableHeaderColumn>

      </TableRow>


      </TableHeader>
        <TableBody
        displayRowCheckbox={this.state.showCheckboxes}
        deselectOnClickaway={this.state.deselectOnClickaway}
        showRowHover={this.state.showRowHover}
        stripedRows={this.state.stripedRows}
        preScanRows={this.state.preScanRows}
        >
        <TableRow style={{'border-bottom':'0px'}}>
        
        return (
          <TableHeaderColumn style={{height:'25px', width:'50px', padding:'10px', paddingLeft:'10px', textAlign:'center'}}>
           'Clusters'
           
          </TableHeaderColumn>
          )

        </TableRow>

         <TableRow>

        return (
         <TableHeaderColumn  style={{paddingRight:'10px', width:'100%', paddingLeft:'10px'}}>
              <RenderColSummary dataVector={tableData} field='RIDAGEYR' refs={this.props.refs}/></TableHeaderColumn>
          )
          </TableRow>



        {tableData.map( (row, index) => (
          <TableRow key={index} selected={this.state.selectedRows.indexOf(index) !== -1}>
     
            return (                 
            <TableRowColumn style={{paddingRight:'10px', width:'100%', paddingLeft:'10px'}}>
              <RenderTreeRow dataVector={tableData} field='RIDAGEYR' data={row.RIDAGEYR} refs={this.props.refs}/>

              </TableRowColumn>
          
            )

          

            </TableRow>
            ))}
            </TableBody>

            </Table>

            </div>

            : <div></div>
            );
          }
        }

// Specifies the default values for props:

TreeTableComponent.defaultProps = {
  refs:null,
  title:'Table Title',
  height:'600px'
};
