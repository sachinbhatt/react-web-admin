/**
 * Add Property popover modal
 */
import React, {Component} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Snackbar, SnackbarContent} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import CitySelect from './city/CitySelectContainer';
import StateSelect from './state/StateSelectContainer';
import CountrySelect from './country/CountrySelectContainer';
import { styles } from '../styles';

const renderedTextField = ({input, label, meta: {touched, error}, ...custom}) => {
	return <TextField floatingLabelText={label}
					error={touched && error}
					{...input} {...custom}
					onChange={input.onChange} />;
}

class AddPropertyForm extends Component{
	constructor(props) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onModalToggle = this.onModalToggle.bind(this);
		this.onSnackBarClose = this.onSnackBarClose.bind(this);
	}
	
	onSnackBarClose(event){
		this.props.clearStates('save');
	}

	onModalToggle(){
		this.props.setPropertyDialogVisible();
	}
	
	/* onFormSubmit(event, a, b, c){
		event.preventDefault();
		if(this.props.formValues
			&& this.props.formValues
			&& this.props.formValues.values) {
				this.props.saveProperty(this.props.formValues.values);
			}
	} */

	onFormSubmit = (values, dispatch, props) => {
		this.props.saveProperty(values);
	}

	render() {
		const {classes, saving, saved, saveError} = this.props;
		const { handleSubmit, pristine, submitting } = this.props;
		// console.log("Submitting:", submitting, " Saving:", saving, " Saved:", saved);
		return (
			<div>
				<Snackbar autoHideDuration={1800} open={saving} onClose={this.onSnackBarClose}>
					{/* anchorOrigin={{
						vertial: 'top', horizontal: 'right'
					}} > */ }
					<SnackbarContent variant='info'
													aria-describedby="savingMessageId"
													className={classes.propertySaveStart}
													message={<span id='savingMessageId' className={classes.propertySaveMessage}>Saving the property</span>}/>
				</Snackbar>
					<Snackbar autoHideDuration={1800} open={saved || saveError != ''}>
					<SnackbarContent variant={saved && saveError=='' ? `success` : `error`}
													aria-describedby="saveStatusMessageId"
													className={saved && saveError=='' ? classes.propertySaveSuccess : classes.propertySaveError}
													message={<span id='saveStatusMessageId' className={classes.propertySaveMessage}>{saved && saveError=='' ? `Property saved!` : saveError}</span>}/>
				</Snackbar>
				{/* <Snackbar message={<span id='messageId'>Problems saving Property!</span>}
					autoHideDuration={2200} open={saving && !saved} ContentProps={{"aria-describedby": "messageId"}}>
				</Snackbar> */}
				<Dialog open={this.props.isAddPropModalOpen} onClose={this.onModalToggle}>{/*  className={classes.dialog} */}
				<form onSubmit={handleSubmit(this.onFormSubmit)}>
					<DialogTitle>{this.props.title}</DialogTitle>
					<DialogContent className={classes.root}>
						<Field name="name" label="Name" className={classes.formControl} component={renderedTextField} placeholder="Property Name" margin="normal" />
						<Field name="description" label="Description" placeholder="Description" rowsMax="2" className={classes.formControl} component={renderedTextField} />
						<Field name="addressLine1" label="Address Line 1" placeholder="Address Line 1" className={classes.formControl} component={renderedTextField} />
						<Field name="addressLine2" label="Address Line 2" placeholder="Address Line 2" className={classes.formControl} component={renderedTextField} />
						<Field name="country" label="Country" placeholder="Select a Country" component={CountrySelect} />
						<Field name="state" label="State" placeholder="Select a State" component={StateSelect} />
						<Field name="city" label="City" placeholder="Select a City" component={CitySelect} />						
						<Field name="propertyGroup" label="Property Group" className={classes.formControl} placeholder="Property Group" component={renderedTextField} />
						{/* <CountrySelect className={classes.formControl}/> */}
						{/* <StateSelect className={classes.formControl}/>
						<CitySelect className={classes.formControl}/> */}
					</DialogContent>
					<DialogActions>
						<Button color="primary" variant="outlined" type="submit" disabled={pristine || submitting}>Save Property</Button>
						<Button color="secondary" variant="text" onClick={this.onModalToggle}>Cancel</Button>
					</DialogActions>
				</form>
					</Dialog></div>
		);
	}
}

//--- Works without redux-form
//export default withStyles(styles)(AddPropertyForm);

//--- Works without withStyles
//export default reduxForm({form: 'AddPropertyForm'})(AddPropertyForm);

//--- Works well in combination
/* AddPropertyForm = connect(state => ({
	...state,
	initialValues: state.property.model
}))(reduxForm({form: 'AddPropertyForm'})(AddPropertyForm)); */
export default withStyles(styles)(AddPropertyForm);
