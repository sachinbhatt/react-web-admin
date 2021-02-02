import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import PropertyListing from './PropertyListingContainer';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {Link, Switch, Route} from 'react-router-dom';
import AddPropertyForm from './AddPropertyContainer';

const styles = theme => ({
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	addButton: {
    marginLeft: 'auto',
    marginLeft: '5%',
	}
});

class PropertyHome extends Component{
	constructor(props){
		super(props);
		this.onAddProperty = this.onAddProperty.bind(this);
	}

	onAddProperty(event){
		this.props.setPropertyDialogVisible();
	}

	render(){
		const {match, classes} = this.props;
		return(
			<main>
				<PropertyListing leftPadding={300} className={classNames(classes.content, {[classes.contentShift]: true,})} />
				<Button className={classes.addButton} color="primary" variant="outlined" onClick={this.onAddProperty}>Add Property</Button>
				<AddPropertyForm />
			</main>
		);
	}
}

export default PropertyHome = withStyles(styles, {withTheme: true})(PropertyHome);
/*
<Button color="primary" variant="outlined" to={`${match.url}?addProperty`}
								component={Link}>Add Property</Button>
								<Route exact path={`${match.url}?addproperty`} render={AddPropertyModal} />
 <Route exact path={`${match.url}?addproperty`} render={this.renderAddPropertyModel} /> */