import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
//import {getAllProperties, setPropertyDialogVisible, saveProperty, clearStates} from './actions';
import Login from '../components/auth/Login';

import { reduxForm } from 'redux-form';
import {loginRequest,loginStatus} from '../redux/action_login';
import App from '../App';


const mapDispatchToProps = {
	loginRequest,
	loginStatus
};

/* const handleSubmit = (values, dispatch, props) => {
	saveProperty(values);
} */

const formValidations = (values, props) => {
	/*let results = {};
	if(props && props.registeredFields){
		Object.values(props.registeredFields).map( ({name}) => {
			if(values [name] == undefined
				|| values [name] == "")
				results [name] = `value for ${name} required`;
		});
	}
	console.log(results);
	return results; */
}

const mapStateToProps = globalState => {
	return {
		userData: globalState.login.userData,
		isLoginSuccess: globalState.login.isLoginSuccess,
		isLoggedOut: globalState.login.isLoggedOut,
		isError: globalState.login.isError,
		isLoggedin: globalState.login.isLoggedin,
		initialValues: {userName: (localStorage.getItem('checked_user')? localStorage.getItem('checked_user'):'')} 
	  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(
	{
		form: 'loginForm',
		validate: formValidations,
	})(Login)));