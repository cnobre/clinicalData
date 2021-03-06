import React from 'react';

import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import {grey500, blueGrey700} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

import RenderQuantCell from './RenderQuantCell'
import RenderBooleanCell from './RenderBooleanCell'
import RenderColSummary from './RenderColSummary'

import Meter from './Meter'



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

const twidth = 75
const padding = '5px'

export default class TableComponent extends React.Component {

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

         <linearGradient id="linear-gradient">
      <stop offset="14%" stopColor="#2f343b" stopOpacity="0%"/>
      <stop offset="43%" stopColor="#337082" stopOpacity="41%"/>
      <stop offset="67%" stopColor="#369fb9" stopOpacity="73%"/>
      <stop offset="79%" stopColor="#37b1cf" stopOpacity="85%"/>        
      </linearGradient>

      <Table
      height={this.state.height}
      fixedHeader={this.state.fixedHeader}
      fixedFooter={this.state.fixedFooter}
      
      selectable={this.state.selectable}
      multiSelectable={this.state.multiSelectable}
      bodyStyle={{'overflowX':'scroll', 'overflowY':'visible'}}
      
      >
      {/*
      style={{tableLayout: 'auto'}} 
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
        <TableRow style={{'borderBottom':'0px'}}>
      {Object.keys(tableData[0]).map((key)=> { 
        
        return (

          <TableHeaderColumn data-tooltip={key} tooltip={key} key={key} style={{height:'10px', width:twidth, padding:padding, paddingLeft:padding, textAlign:'center', overflow:'hidden'}}>
           {key}
           {/*<span>
           <br/> <DownIcon style={iconStyles} color={grey500} hoverColor={blueGrey700} onClick={()=>{this.handleSort('down',key)}}/>
           <UpIcon style={iconStyles} color={grey500} hoverColor={blueGrey700} onClick={()=>{this.handleSort('up',key)}} />
           </span>*/}
          </TableHeaderColumn>
          )
        
        })}


        </TableRow>

         <TableRow>
      {Object.keys(tableData[0]).map((key)=> { 
        return (
         <TableHeaderColumn  key={key} style={{paddingRight:padding, width:twidth, paddingLeft:padding}}>
              <RenderColSummary dataVector={tableData} field={key} refs={this.props.refs} width={twidth}/></TableHeaderColumn>
          )
        
        })}


        </TableRow>



        {tableData.map( (row, index) => (
          <tr key={index} style={{borderBottom:'0px solid rgb(224, 224, 224)', color:'rgba(0, 0, 0, 0.87)', height:30}} >

          {Object.keys(row).map((key)=> { 
      
            return (                 
            <td  key={key} style={{paddingRight:padding, width:{twidth}, height:20, paddingLeft:padding}}>

             <RenderQuantCell label={'Value: ' + row[key]} percent={row[key]} dataVector={tableData} field={key} data={row[key]} refs={this.props.refs} width={twidth}/>
           
          
            </td>
          
            )

          })}

            </tr>
            ))}
            </TableBody>

            </Table>

            </div>

            : <div></div>
            );
          }
        }

// Specifies the default values for props:
TableComponent.defaultProps = {
  refs:null,
  title:'Table Title',
  height:'600px'
};
