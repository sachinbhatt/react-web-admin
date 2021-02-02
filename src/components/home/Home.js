import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link, Switch, Route,Redirect} from 'react-router-dom';
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

class Home extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount()
	{
		this.props.loginStatus();
	};

	render(){
		console.log("home    ", localStorage.getItem('isLoggedin'));
		const path = this.props.location.pathname;
		if(!localStorage.getItem('isLoggedin'))
		{
			console.log("Hello");
				return (
				<Redirect to={{
					pathname: path
				  }}/>
				);
		}
		else
		{
		return (
			<div style={{display: 'flex', flexGrow: 1, flexDisplay: 'column', alignItems: 'center', marginTop: 80, margin: "auto", width: 500, height: 400, fontSize: 22}}>Welcome!!</div>
		);
		}
	}
}

export default Home = withStyles(styles, {withTheme: true})(Home);