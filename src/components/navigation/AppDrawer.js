import React, { Component } from 'react';
import {Drawer, AppBar, Toolbar, IconButton, Menu, MenuItem, CssBaseline, Divider, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import ChevronLeftTwoTone from '@material-ui/icons/ChevronLeftTwoTone';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { appDrawerOpen, appDrawerClose } from "./actions";
import {Link} from 'react-router-dom';
import classNames from 'classnames';

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
});

class AppDrawer extends Component{
	state = {
		anchorEl: null
	};
	
	handleDrawerOpen = () => {
    this.props.appDrawerOpen();
		//this.setState({ open: true });
	};

	handleDrawerClose = () => {
    this.props.appDrawerClose();
		//this.setState({ open: false });
	};

	openProfileMenu = event => {
		this.setState({anchorEl: event.currentTarget});
	};

	handleProfileClose = event => {
		this.setState({ anchorEl: null });
	};

	render(){
    const {classes, theme, isDrawerOpen} = this.props;
		const {anchorEl} = this.state;
		const menuOpen = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<AppBar position="fixed" className={classNames(classes.appBar, {[classes.appBarShift]: isDrawerOpen})}>
					{/* <CssBaseline /> */}
					<Toolbar disableGutters={!isDrawerOpen}>
						<IconButton color="inherit" area-label="Open Menu" onClick={this.handleDrawerOpen} className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h5" color="inherit" noWrap className={classes.grow}>
              Admin Panel
            </Typography>
						<div>
							<IconButton area-owns={menuOpen ? 'menu-appbar' : undefined} area-haspopup="true" onClick={this.openProfileMenu} color="inherit">
								<AccountCircle />
							</IconButton>
							<Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}}
										open={menuOpen} transformOrigin={{vertical: 'top', horizontal: 'right'}} onClose={this.handleProfileClose}>
								<MenuItem>Settings</MenuItem>
								<MenuItem>Log Out</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
				<Drawer className={classes.drawer} variant="temporary" anchor="left"
								open={isDrawerOpen} classes={{paper: classes.drawerPaper}}>
					{/* --- Drawer menu header --- */}
          <div className={classes.drawerHeader}>
						<div className={classes.drawerTitle}>
							<Typography variant="title" color="inherit" align="left">MyCard</Typography>
							<span className={classes.appVersion}>v0.1</span>
						</div>
						<IconButton color="inherit" onClick={this.handleDrawerClose}><ChevronLeftTwoTone color="inherit" /></IconButton>
					</div>

					<Divider />

          {/* --- Navigation --- */}
					<List component="nav">
						<ListItem button to="proplist" component={Link}>
							<ListItemText primary="Properties" className={classes.listItem} />
						</ListItem>
						<ListItem button to="cardhome" component={Link}>
							<ListItemText primary="Cards" className={classes.listItem} />
						</ListItem>
					</List>
				</Drawer>
			</div>
		);
	}
}

const mapDispatchToProps = {
  appDrawerOpen,
  appDrawerClose
};

const mapStateToProps = globalState => {
  return {
    isDrawerOpen: globalState.app.isDrawerOpen,
  };
}

const AppDrawerStyled = withStyles(styles, { withTheme: true })(AppDrawer);
export default connect(mapStateToProps, mapDispatchToProps)(AppDrawerStyled);
