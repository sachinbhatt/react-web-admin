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

class CardHome extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount()
	{
		this.props.loginStatus();
	};

	render(){
			const path = this.props.location.pathname;
			if(!localStorage.getItem('isLoggedin'))
			{
					return (
					<Redirect to={{
					pathname: path
				 	 }}/>
					);
			}
			else
			{
			return (
			<div style={{display: 'flex', flexGrow: 1, flexDisplay: 'column', alignItems: 'center', marginTop: 80, margin: "auto", width: 500, height: 400, fontSize: 22}}>Nothing to show! Add some cards.</div>
			);
			}
	}
}

export default CardHome = withStyles(styles, {withTheme: true})(CardHome);