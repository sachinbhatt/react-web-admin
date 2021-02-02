/**
 * Add Property popover modal
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {API_ROOT} from '../../util/AppConstants';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Row, Col } from 'reactstrap';

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
		this.state = {
			countryList: [],
			selectedCountryId: 0,
			stateList: [],
			selectedStateId: 0,
			cityList: [],
			selectedCityId: 0,
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
	 * Get all the countries...
	 */
	async getAllCountries(){
		if(this.state.countryList.length > 0) return;
		await fetch(API_ROOT.concat("country/getAll"))
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({countryList: jsonResult});
				console.log(this.state.countryList);
			})
			.catch((error) => {
				console.log("No countries data found:\n" + error);
			});
	}
	
	/**
	 * 
	 * @param countryId ID of the selected country in the dropdown...
	 */
	async getAllStatesByCountry(){	//countryId
		await fetch(API_ROOT.concat(`state/get/country/id/${this.state.selectedCountryId}`))
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({stateList: jsonResult});
				console.log(this.state.stateList);
			})
			.catch((error) => {
				console.log("No states data found for selected country:\n" + error);
			});
	}

	/**
	 * 
	 * @param stateId ID of selected state in the dropdown
	 */
	async getAllCitiesByState(stateId){
		await fetch(API_ROOT.concat(`city/get/state/id/${this.state.selectedStateId}`))
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({cityList: jsonResult});
				console.log(this.state.cityList);
			})
			.catch((error) => {
				console.log("No cities data found for the selected state:\n" + error);
			});
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
				console.log(`Selected Country:${inputControl.selectedItem}`);
				this.setState({selectedStateId: inputControl.selectedItem});
				this.getAllStatesByCountry();
				break;

			case 'selectState':
				console.log("Selected State:" + inputControl.selectedItem);
				break;
			
			case 'selectCity':
				console.log("Selected City:" + inputControl.selectedItem);
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
		if(!this.props || !this.props.toggle)
			return null;
		
		return (
			<Modal isOpen={this.props.showModal} toggle={this.onModalToggle} className={this.props.className}>
				<ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
				<Form onSubmit={this.onFormSubmit}>
					<ModalBody>
							<FormGroup>
								<Label size="md" for="name">Name</Label>
								<Input size="md" required type="text" name="name" id="name" placeholder="Property name" onChange={this.onInputChange} />
							</FormGroup>
							<FormGroup>
								<Label size="md" for="description">Description</Label>
								<Input size="md" type="text" name="description" id="description" placeholder="Property Description" onChange={this.onInputChange} />
							</FormGroup>
							<FormGroup>
								<Label size="md" for="address">Address</Label>
								<Input size="md" type="text" name="addressLine1" id="addressLine1" placeholder="Address Line 1" style={{marginBottom: "8px"}} onChange={this.onInputChange} />
								<Input size="md" type="text" name="addressLine2" id="addressLine2" placeholder="Address Line 2" onChange={this.onInputChange} />
							</FormGroup>
							<FormGroup>
								<Label size="md" for="country">Country</Label>
								<Input size="md" type="select" name="country" id="selectCountry"
											placeholder="Select country" onChange={this.onInputChange}>
											</Input>
							</FormGroup>
							<Row form>
								<Col sm="6">
									<FormGroup>
										<Label size="md" for="state">State</Label>
										<Input size="md" type="select" name="state" id="selectState" placeholder="Select state" onChange={this.onInputChange} />
									</FormGroup>
								</Col>
								<Col sm="6">
									<FormGroup>
										<Label size="md" for="city">City</Label>
										<Input size="md" type="select" name="city" id="selectCity" placeholder="Select city" onChange={this.onInputChange} />
									</FormGroup>
								</Col>
							</Row>
							<FormGroup>
								<Label size="md" for="propertyGroup">Property Group</Label>
								<Input size="md" type="text" name="propertyGroup" id="propertyGroup" placeholder="Property Group" onChange={this.onInputChange} />
							</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" size="md" type="submit">Save Property</Button>{' '}
						<Button color="secondary" size="md" onClick={this.props.toggle}>Cancel</Button>
					</ModalFooter>
				</Form>
			</Modal>
		);
	}
}

/* AddPropertyModal.propTypes = {
	formSubmitHandler: PropTypes.func,
	toggle: PropTypes.func
}; */
export default AddPropertyModal;
