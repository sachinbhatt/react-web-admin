import React, {Component} from 'react';
import {FormControl, MenuItem, Select, InputLabel} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles';

class CitySelect extends Component{
	constructor(props){
		super(props);
		this.onSelectControlsChange = this.onSelectControlsChange.bind(this);
	}

	/**
	 * Generate MenuItem elements for the City Select box...
	 */
	populateCities(){
		let menuItems = this.props.cityList.map(city => (
			<MenuItem value={city.name} key={city.id}>{city.name}</MenuItem>));
		return menuItems;
	}

	onSelectControlsChange(event, child){
    this.props.cityItemSelection({id: child.key, name: event.target.value});	//child.key
    this.props.input.onChange(event.target.value);
	}

	render(){
		return (
      <FormControl className={this.props.classes.formControl} disabled={!this.props.selectedCity || (!this.props.cityList || this.props.cityList.length == 0)}>
				<InputLabel>City</InputLabel>
				<Select onChange={this.onSelectControlsChange}
								children={this.populateCities()} value={this.props.selectedCity.name} key={this.props.selectedCity.id} />
			</FormControl>
      );
	}
}

export default withStyles(styles)(CitySelect);