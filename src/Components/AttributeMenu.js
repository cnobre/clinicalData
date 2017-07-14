import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import ContentInbox from 'material-ui/svg-icons/action/done';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';


import RenderColSummary from './RenderColSummary'


import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';



import {List, ListItem} from 'material-ui/List';

import Paper from 'material-ui/Paper';

import AutoCompleteComponent from './AutoCompleteComponent'

export default class attributeMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };



  render() {

    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };

    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Select Table Attributes"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >

       
      <div style={{width:1800, height:190, margin:0}}>
          <List style={flexContainer}>

         {Object.keys(this.props.attributes).sort().map((key)=> { 
        
        return (
           <Paper style={{width:180, height:150, margin:20}} zDepth={1} key={'p' + key}>
          <ListItem rightToggle={<Toggle />} key={'list' + key} primaryText={key} 
          secondaryText={<RenderColSummary dataVector={this.props.allData} field={key}  width={75}/>}/>
          </Paper>
          )        
        })}
      
    </List>

    </div>

        
         
        </Popover>
      </div>
    );
  }
}