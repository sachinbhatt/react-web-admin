import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {AppBar, Toolbar, IconButton,
	Menu, MenuItem,Container,
	Drawer, List, ListItem, ListItemText,
	Typography, Divider, CssBaseline} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftTwoTone from '@material-ui/icons/ChevronLeftTwoTone';
import {Link, NavLink} from 'react-router-dom';
import Login from './containers/LoginContainer';
import Home from './components/home/HomeContainer';
import { Route, Redirect } from 'react-router-dom';
import { throwStatement } from '@babel/types';

const drawerWidth = 240;
const styles = theme => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: '#3f51b5',
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
		color: 'rgb(242, 201, 76)'
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		color: 'rgb(242, 201, 76)'
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: 'rgb(242, 201, 76)'
	},
	drawerHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '0 14px',
		...theme.mixins.toolbar,
		backgroundColor: '#3f51b5',
		justifyContent: 'space-between',
	},
	drawerTitle: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	appVersion: {
		marginTop: '4px',
		fontSize: '12px'
	},
	listItem: {
		fontSize: '28px',
		fontWeight: '300'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	activeLinkClass: {
		color: 'inherit',
		textDecoration: 'none',
		backgroundColor: 'rgb(222, 230, 76)'
	}
});

class App extends Component {
	state = {
		anchorEl: null,
	};
	componentDidMount()
	{
		this.props.loginStatus();
		console.log("location...........",this.props.location.pathname);
	};
	handleDrawerOpen = (event) => {
		this.props.appDrawerOpen();
	};

	handleLogout= (event) => {
		this.props.logoutRequest("","");
		if(!localStorage.getItem('isLoggedin'))
		{
			this.props.history.push('/');
		}
	}
	
	handleDrawerClose = (event) => {
		this.props.appDrawerClose();
		this.props.drawerLinkOpened(event.target.innerText);
	};

	openProfileMenu = event => {
		this.setState({anchorEl: event.currentTarget});
	};
	handleProfileClose = event => {
		this.setState({ anchorEl: null });
	};
	
	render() {
		const {classes, theme, isDrawerOpen} = this.props;
		const {anchorEl} = this.state;
		const menuOpen = Boolean(anchorEl);
		const path = this.props.location.pathname;
		console.log(!localStorage.getItem("isLoggedin")?'Sign in':'');
		return(
			<div className={classes.root}>
				<AppBar position="fixed" className={classNames(classes.appBar, {[classes.appBarShift]: isDrawerOpen})}>
					<CssBaseline />
					<Toolbar disableGutters={!isDrawerOpen}>
						<IconButton color="inherit" area-label="Open Menu" onClick={this.handleDrawerOpen} className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h5" color="inherit" noWrap className={classes.grow}>
								Admin Panel {!localStorage.getItem("isLoggedin")?'/Sign in':path=='/proplist'?'/Welcome Properties':path=='/cardhome'?'/Welcome Cards':''}
						</Typography>
						<Typography>
						{localStorage.getItem("isLoggedin")?
								localStorage.getItem("userid"):'' 
								}
						</Typography>
						<div>
							<IconButton area-owns={menuOpen ? 'menu-appbar' : undefined} area-haspopup="true" onClick={this.openProfileMenu} color="inherit">
								<AccountCircle />
							</IconButton>
							<Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}}
										open={menuOpen} transformOrigin={{vertical: 'top', horizontal: 'right'}} onClose={this.handleProfileClose}>
								<MenuItem>Settings</MenuItem>
								{localStorage.getItem("isLoggedin")?
								<MenuItem onClick={this.handleLogout}>Log Out</MenuItem>:''
								}
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
				<Drawer className={classes.drawer} variant="temporary" anchor="left"
								open={isDrawerOpen} classes={{paper: classes.drawerPaper}}>
					<div className={classes.drawerHeader}>
						<div className={classes.drawerTitle}>
							<Typography variant="title" color="inherit" align="left">MyCard</Typography>
							<span className={classes.appVersion}>v0.1</span>
						</div>
						<IconButton color="inherit" onClick={this.handleDrawerClose}><ChevronLeftTwoTone color="inherit" /></IconButton>
					</div>
					<Divider />
					<List component="nav">
						<ListItem button to='/home' component={Link} onClick={this.handleDrawerClose}>
							<ListItemText primary="Home" className={classes.listItem} />
						</ListItem>
						<ListItem button to="/proplist" component={Link} onClick={this.handleDrawerClose}>
							<ListItemText primary="Properties" className={classes.listItem} />
						</ListItem>
						<ListItem button to="/cardhome" component={Link} onClick={this.handleDrawerClose}>
							<ListItemText primary="Cards" />
						</ListItem>
					</List>
				</Drawer>
				{localStorage.getItem("isLoggedin") || (path=='/login')?null:<Login/>}
			</div>
		    );
	}
}

export default withStyles(styles, { withTheme: true })(App);
