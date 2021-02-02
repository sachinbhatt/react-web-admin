import React, {Component} from 'react';
import {FormControl, MenuItem, InputLabel, Select} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles';

class StateSelect extends Component{
	constructor(props){
		super(props);
		this.onSelectControlsChange = this.onSelectControlsChange.bind(this);
	}
	
	/**
	 * Generate MenuItem elements for the State Select box...
	 */
	populateStates(){
		let menuItems = this.props.stateList.map(state => (
			<MenuItem value={state.name} key={state.id}>{state.name}</MenuItem>));
		return menuItems;
	}

	onSelectControlsChange(event, child){
    this.props.stateItemSelection({id:child.key, name:event.target.value});
    this.props.input.onChange(event.target.value);
	}

	render(){
		return (
      <FormControl className={this.props.classes.formControl} disabled={!this.props.selectedState || (!this.props.stateList || this.props.stateList.length == 0)}>
				<InputLabel>State</InputLabel>
        <Select onChange={this.onSelectControlsChange}
								children={this.populateStates()} value={this.props.selectedState.name} key={this.props.selectedState.id} />
			</FormControl>
      );
    }
}

export default withStyles(styles)(StateSelect);