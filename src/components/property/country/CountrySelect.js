import React, {Component} from 'react';
import {FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles';

class CountrySelect extends Component{
	constructor(props){
		super(props);
		this.onSelectControlsChange = this.onSelectControlsChange.bind(this);
	}

	componentWillMount(){
		//this.props.getAllCountries();
		this.props.getCountryByName("United States");
	}
	
	/**
	 * Generate MenuItem elements for the City Select box...
	 */
	populateCountries(){
		let menuItems = this.props.countryList.map(country => 
				<MenuItem value={country.name} key={country.id}>{country.name}</MenuItem>);
		return menuItems;
	}

	onSelectControlsChange = (event, child) => {
		this.props.countryItemSelection({id:child.key, name:event.target.value});
		this.props.input.onChange(event.target.value);
	}

	render(){
		// const {input, meta} = this.props;
		return (
			<FormControl className={this.props.classes.formControl} disabled={(!this.props.countryList || this.props.countryList.length == 0)}>
				<InputLabel>Country</InputLabel>
				<Select onChange={this.onSelectControlsChange}
							children={this.populateCountries()} value={this.props.selectedCountry.name} key={this.props.selectedCountry.id} />
							</FormControl>
			);
	}
}

export default withStyles(styles)(CountrySelect);