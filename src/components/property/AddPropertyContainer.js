import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getAllProperties, setPropertyDialogVisible, saveProperty, clearStates} from './actions';
import AddPropertyForm from './AddProperty';
import { reduxForm } from 'redux-form';

const mapDispatchToProps = {
  getAllProperties,
  setPropertyDialogVisible,
  saveProperty,
  clearStates
};

/* const handleSubmit = (values, dispatch, props) => {
	saveProperty(values);
} */

const formValidations = (values, props) => {
	let results = {};
	if(props && props.registeredFields){
		Object.values(props.registeredFields).map( ({name}) => {
			if(values [name] == undefined
				|| values [name] == "")
				results [name] = `value for ${name} required`;
		});
	}
	return results;
}

const mapStateToProps = (globalState, myProps) => {
	return {
    propertyList: globalState.property.propertyList,
    saving: globalState.property.saving,
    saved: globalState.property.saved,
    saveError: globalState.property.saveError,
    isAddPropModalOpen: globalState.property.isAddPropModalOpen,
    formValues: globalState.form.addPropertyForm
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(
	{
		form: 'addPropertyForm',
		validate: formValidations,
		//onSubmit: handleSubmit,
		//asyncChangeFields: ['name', 'description'],
		//asyncValidate: formValidations
	})(AddPropertyForm)));