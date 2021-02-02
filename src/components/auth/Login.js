import React, {Component} from 'react';
import {TextField, Button, Snackbar, SnackbarContent, Checkbox, Typography} from '@material-ui/core';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';
import { Redirect } from 'react-router-dom';

const renderedTextField = ({input, label, meta: {touched, error}, ...custom}) => {
	return <TextField floatingLabelText={label}
					error={touched && error}
					{...input} {...custom}
					onChange={input.onChange} />;
}

class Login extends Component{
	constructor(props)
	{
		super(props);
        this.state={
			username:'',
			password:'',
			checked:false
		};
		this.handleChangeUsername=this.handleChangeUsername.bind(this);
		this.handleChangePassword=this.handleChangePassword.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}
	onFormSubmit = (values, dispatch, props) => {
		this.setState({username:values.userName}, function () {
			this.props.loginRequest(this.state);
		});
		this.props.loginStatus();
	}
	handleChangeUsername(e){
		this.setState(
			{username:e.currentTarget.value
			} 
		)

	}
	handleChangePassword(e){
		this.setState(
			{password:e.currentTarget.value
			} 
		)

	}
	handleChange(e){
		console.log(e.target.checked);
		this.setState(
			{checked:e.target.checked
			} 
		)
	}
	
	render() {
		const {classes, saving, results, isError} = this.props;
		const { handleSubmit, pristine, reset, submitting } = this.props;
		const path = this.props.location.pathname;
		const checked_user=localStorage.getItem('checked_user');
		console.log(checked_user);
		if(localStorage.getItem('isLoggedin'))
		{
					return (
					<Redirect to={{
					pathname: '/home'
				 	 }}/>
					);
		}
		else
		{
		return (
			<div className={classes.cointainer}>
				<div className={classes.panelContainer}>
				<Typography style={{fontSize:'larger',color:'#26365e',fontWeight:'bold'}}>Admin Panel</Typography>
				</div>
				<form onSubmit={handleSubmit(this.onFormSubmit)} className={classes.formCointainer}>
					<div>
						<label className={classes.labelControl}>Username </label>
						<Field name="userName" label="Username" type="text" placeholder="username" className={classes.fieldControl} component={renderedTextField} onChange={this.handleChangeUsername} />
					</div>
					<div>
						<label  className={classes.labelControl}>Password</label>
						<Field name="password" type="Password" placeholder="*********" className={classes.fieldControl} onChange={this.handleChangePassword} component={renderedTextField} />
					</div>
					<div style={{paddingTop:14}}>
						<Checkbox name="checked" style={{padding:'initial'}} onClick={this.handleChange}/><label>Remember Me</label>
					</div>
				    <div className={classes.buttonContainer}>
						<Button color="primary" variant="outlined" style={{backgroundColor:'#26365e',width: 150,color:'#ffffff',fontWeight:'bold',}} type="submit" disabled={pristine || submitting} onClick={this.modaltoggle}>Log in</Button>	
					</div>
				</form>
				<Snackbar autoHideDuration={200} open={isError != ''}>
					<SnackbarContent variant={isError==''? `success` : `error`}
													aria-describedby="loginStatusMessageId"
													className={isError==''? classes.loginSaveSuccess : classes.loginSaveError}
													message={<span id='loginStatusMessageId' className={classes.loginSaveMessage}>{isError==''? `Welcome!` : isError}</span>}/>
				</Snackbar>
			</div>
		);
		}
	}
}

export default withStyles(styles)(Login);
