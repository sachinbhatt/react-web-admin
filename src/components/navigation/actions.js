import { APP_DRAWER_OPEN, APP_DRAWER_CLOSE, DRAWER_LINK_CLICKED } from './actionTypes';

export const drawerLinkOpened = (linkName) => {
	return dispatch => {
		dispatch({type: DRAWER_LINK_CLICKED, payload: linkName});
	}
}

export const appDrawerOpen = () => {
	return dispatch => {
		dispatch({type: APP_DRAWER_OPEN, payload: true});
	}
}

export const appDrawerClose = () => {
	return dispatch => {
		dispatch({type: APP_DRAWER_CLOSE, payload: false});
	}
}
