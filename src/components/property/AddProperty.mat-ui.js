/**
 * Add Property popover modal
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {API_ROOT} from '../../util/AppConstants';
import {Dialog, DialogTitle, DialogContent, DialogActions, FormControl, TextField, Select, MenuItem, InputLabel, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
		flexDirection: 'column',
		justityContent: 'flex-start',
		alignItems: 'space-between',
	},
	dialog: {
		margin: 'auto',
	},
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 280,
  },
});

class AddPropertyModal extends Component{
	rawPropertyPost = {
		name: "",
		description: "",
		addressLine1: "",
		addressLine2: "",
		cardPrefixChars: "",
		cardPostfixChars: "",
		coordLat: 0.0,
		coordLng: 0.0
	}

	constructor(props) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onModalToggle = this.onModalToggle.bind(this);
		this.onSelectControlsChange = this.onSelectControlsChange.bind(this);
		this.state = {
			countryList: [],
			countryMenuItems: [],
			selectedCountry: {name: "", id: -1},

			stateList: [],
			stateMenuItems: [],
			selectedState: {name: "", id: -1},

			cityList: [],
			cityMenuItems: [],
			selectedCity: {name: "", id: -1},
			propertyPost: this.rawPropertyPost
		};
	}
	
	componentDidMount(){
		this.getAllCountries();
	}

	onModalToggle(){
		this.getAllCountries();
		this.props.toggle();
	}

	/**
	 * Make a call to fetch all the countries...
	 */
	async getAllCountries(){
		if(this.state.countryList.length > 0) return;
		await fetch(API_ROOT.concat("country/getAll"))
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({countryList: jsonResult});
				this.populateCountries();
				//console.log(this.state.countryList);
			})
			.catch((error) => {
				console.log("No countries data found:\n" + error);
			});
	}
	
	/**
	 * Generate MenuItem elements for the City Select box...
	 */
	populateCountries(){
		let countryMenuItems = this.state.countryList.map(country => (
			<MenuItem value={country.name} key={country.id}>{country.name}</MenuItem>));
		this.setState({ countryMenuItems: countryMenuItems });
	}

	/**
	 * Make a call to fetch states associated with the selected country...
	 */
	async getAllStatesByCountry(){
		await fetch(API_ROOT.concat(`state/get/country/id/${this.state.selectedCountry.id}`))
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({stateList: jsonResult});
				this.populateStates();
				//console.log(this.state.stateList);
			})
			.catch((error) => {
				console.log("No states data found for selected country:\n" + error);
			});
	}

	/**
	 * Generate MenuItem elements for the State Select box...
	 */
	populateStates(){
		let stateMenuItems = this.state.stateList.map(state => (
			<MenuItem value={state.name} key={state.id}>{state.name}</MenuItem>));
		this.setState({ stateMenuItems: stateMenuItems });
	}

	/**
	 * Make a call to fetch cities associated with selected state...
	 */
	async getAllCitiesByState(){
		await fetch(API_ROOT.concat(`city/get/state/id/${this.state.selectedState.id}`))
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({cityList: jsonResult});
				this.populateCities();
				//console.log(this.state.cityList);
			})
			.catch((error) => {
				console.log("No cities data found for the selected state:\n" + error);
			});
	}

	/**
	 * Generate MenuItem elements for the City Select box...
	 */
	populateCities(){
		let cityMenuItems = this.state.cityList.map(city => (
			<MenuItem value={city.name} key={city.id}>{city.name}</MenuItem>));
		this.setState({ cityMenuItems: cityMenuItems });
	}
	
	componentWillUpdate(nextProps, nextState){
		console.log(`next country:: ${nextState.selectedCountry.name}`);
	}

	/**
	 * MenuItem selection handler for country/state/city Select boxes...
	 * @param event Event instance
	 * @param child Selected menuitem child
	 */
	onSelectControlsChange(event, child){
		let inputControl = event.target;
		switch(inputControl.name){
			case 'country':
			this.setState((state, props) => (
				{selectedCountry: {name: state.selectedCountry.name != "" ? state.selectedCountry.name : event.target.value,
					id: state.selectedCountry.id > -1 ? state.selectedCountry.id : child.key}}));
			this.getAllStatesByCountry();
			break;
			case 'state':
			this.setState({selectedState: {name: event.target.value, id:child.key}});
			this.getAllCitiesByState();
			break;
			case 'city':
			this.setState({selectedCity: {name: event.target.value, id:child.key}});
			break;
		}
		// console.log("Selected country: " + this.state.selectedCountry.name + "Selected id: " + this.state.selectedCountry.id);
	}

	/**
	 * Change handler for multiple form controls...
	 * @param event an instance of the Event
	 */
	onInputChange(event){
		let inputControl = event.currentTarget;
		if(!inputControl) return;
		switch(inputControl.id.toLowerCase()){
			case 'selectCountry':
				//console.log(`Selected Country:${inputControl.selectedItem}`);
				this.setState({selectedStateId: inputControl.selectedItem});
				this.getAllStatesByCountry();
				break;

			case 'selectState':
				//console.log("Selected State:" + inputControl.selectedItem);
				break;
			
			case 'selectCity':
				//console.log("Selected City:" + inputControl.selectedItem);
		}

		let propertyPost = {...this.state.propertyPost};
		propertyPost [inputControl.name] = inputControl.value;
		this.setState({propertyPost});
		/* console.log("------------------------------------\nInput changes :\n");
		for (let prop in propertyPost){
			console.log(prop + " - " + propertyPost [prop]);
			if(prop.indexOf("address") != -1){
				for(let innerProp in propertyPost [prop]){
					console.log("-- " + innerProp + " - " + propertyPost [prop][innerProp]);
				}
			}
		} */
	}
	
	async onFormSubmit(event){
		event.preventDefault();
		this.props.toggle();
		// ----- POSTing to save property data in progress

		await fetch("http://localhost:8080/property/save", 
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Accept-Encoding': 'gzip',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.propertyPost)
			})
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({propertyArray: jsonResult});
				console.log(this.state.propertyArray);
			})
			.catch((error) => {
				console.log("No data found:\n" + error);
			})
	}

	render() {
		const { classes } = this.props;
		if(!this.props || !this.props.toggle)
			return null;
		
		return (
			<Dialog open={this.props.showModal} onClose={this.onModalToggle} className={classes.dialog}>
				<form onSubmit={this.onFormSubmit}>
					<DialogTitle>{this.props.title}</DialogTitle>
					<DialogContent className={classes.root}>
						<FormControl className={classes.formControl}>
							<TextField name="name" id="name" label="Name" value={this.state.name} placeholder="Property Name" onChange={this.onInputChange} margin="normal" />
						</FormControl>
						<FormControl className={classes.formControl}>
							<TextField name="description" id="description" label="Description" value={this.state.description} multiline rowsMax="2"
										placeholder="Property Description" onChange={this.onInputChange} />
						</FormControl>
						<FormControl className={classes.formControl}>
							<TextField name="addressLine1" id="addressLine1" placeholder="Address Line 1" onChange={this.onInputChange} />
						</FormControl>
						<FormControl className={classes.formControl}>
							<TextField name="addressLine2" id="addressLine2" placeholder="Address Line 2" onChange={this.onInputChange} />
						</FormControl>
						<FormControl>
							<InputLabel>Country</InputLabel>
							<Select name="country" id="selectCountry" onChange={this.onSelectControlsChange}
											children={this.state.countryMenuItems} value={this.state.selectedCountry.name} />
						</FormControl>
						<FormControl>
							<InputLabel>State</InputLabel>
							<Select name="state" id="selectState" onChange={this.onSelectControlsChange}
											children={this.state.stateMenuItems} value={this.state.selectedState.name} />
							{/* <TextField select name="state" id="selectState" label="State" placeholder="Select state" onChange={this.onInputChange}>
								{
									this.state.stateList.map(state => (
										<option value={state.name} key={state.id}>{state.name}</option>
									))
								}
							</TextField> */}
						</FormControl>
						<FormControl>
							<InputLabel>City</InputLabel>
							<Select name="city" id="selectCity" onChange={this.onSelectControlsChange}
											children={this.state.cityMenuItems} value={this.state.selectedCity.name} />
						</FormControl>
						<FormControl>
							<TextField name="propertyGroup" id="propertyGroup" label="Property Group" placeholder="Property Group" onChange={this.onInputChange} />
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button color="primary" variant="flat" type="submit">Save Property</Button>
						<Button color="secondary" variant="flat" onClick={this.props.toggle}>Cancel</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	}
}

/* AddPropertyModal.propTypes = {
	formSubmitHandler: PropTypes.func,
	toggle: PropTypes.func
}; */
export default withStyles(styles)(AddPropertyModal);
