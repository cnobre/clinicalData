import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 8,
    width:'auto'
  },
};

const RadioButtonComponent = () => (
  <div style={{display:'inline-block', margin:'auto'}}>
    <RadioButtonGroup style={{ display: 'flex' , width: 'auto'}} name="shipSpeed" defaultSelected="not_light">
      <RadioButton
        value="not_light"
        label="Scatter Plot"
        style={styles.radioButton}
      />
      <RadioButton
        value="light"
        label="Heat Map"
        style={styles.radioButton}
      />
    </RadioButtonGroup>
  </div>
);

export default RadioButtonComponent;