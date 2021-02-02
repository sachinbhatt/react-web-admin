import React, { Component } from 'react';
import './App.css';
//import {DropdownMenu, MenuItem} from 'react-bootstrap-dropdown-menu';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddPropertyForm from './components/property/AddProperty';
import {API_ROOT} from './util/AppConstants';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {propertyArray: [], showModal: false};
		this.onAddProperty = this.onAddProperty.bind(this);
		this.modalToggle = this.modalToggle.bind(this);
	}

	async componentDidMount(){
		await fetch(API_ROOT.concat("property/getAll"))
			.then( result => {
				return result.json();
			})
			.then( jsonResult => {
				this.setState({propertyArray: jsonResult});
				console.log(this.state.propertyArray);
			})
			.catch((error) => {
				console.log("No data found:\n" + error);
			});
	}

	modalToggle() {
		//this.setState( prevState => ({showModal: !prevState.showModal}));
		this.setState({
			showModal: !this.state.showModal
		});
	}

	onAddProperty(event){
		this.modalToggle();
	}

	render() {
		const columns = [{
			Header: 'Name',
			accessor: 'name',
			/* Cell:prop => {
				classes: {"ReactTable-Colors"}
			} */
		},
		{
			Header: 'Created By',
			accessor: 'createdBy',
		},
		{
			Header: 'Modified By',
			accessor: 'modifiedBy',
		},
		{
			Header: 'Date Created',
			accessor: 'createdDate',
		},
		{
			Header: 'Date Modified',
			accessor: 'modifiedDate',
		},
		{
			Header: 'Actiation status',
			Cell: obj => {return !obj.isInactive ? 'Inactive' : 'Active'},
		}];
		const data = this.state.propertyArray;

		return (
			<div className="App">
				<div className="App-Body">
					{/* <div className="TopLinks">
						<span>Log In</span>
						<span>Settings</span>
					</div> */}
					<div className="Header">
						<header className="Header-Left">
							MyCard | Admin Panel
						</header>
						{/* ------ Implement later -------
						 <div className="Header-Right">
							<AppMenu />
						</div> */}
					</div>
					<div className="Header-Links">
						<a href="#">Properties</a>
						<a href="#">Players</a>
						<a href="#">Cards</a>
					</div>
					<div className="Page-Title">
						Properties
						<button onClick={this.onAddProperty} className="addPropertyButton">Add Property</button>
					</div>
					<div className="Content-Area">
						<div>
							<ReactTable data={data} columns={columns}
								className="ReactTable-Colors -highlight -striped"
								defaultPageSize={3}
								showPageJump={false}
								showPageSizeOptions={false}
								style={"ReactTable-Colors"}
								noDataText="No properties found! Add one using 'Add Property'"
								/* NextComponent = {CustomNext}
								PreviousComponent = {CustomPrevious} */
								 />
						</div>
						<AddPropertyForm showModal={this.state.showModal} toggle={this.modalToggle} title="Add Property" />
					</div>
				</div>
			</div>
		);
	}
}

function CustomNext() {
	return <img src="assets/page-next-sm.png" style={{marginTop: "6px"}} />
}

function CustomPrevious() {
	return <img src="assets/page-previous-sm.png" style={{marginTop: "6px"}} />
}

export default App;

/* class AppMenu extends Component{
	render(){
		return(
			<DropdownMenu userName="Logged in User" triggerType="icon" trigger="glyphicon glyphicon-user" triggerWidth="8px" triggerHeight="11px" caratColor="#ffffff">
				<MenuItem text="Settings" location="/settings" />
				<MenuItem text="Logout" onClick={this.logout} />
			</DropdownMenu>
		)
	}
} */