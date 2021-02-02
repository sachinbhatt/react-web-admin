import {API_ROOT} from '../../util/AppConstants';
import { SAVE_PROPERTY, SAVE_PROPERTY_SUCCESS,
	LOAD_PROPERTIES, SAVE_PROPERTY_ERROR, LOAD_PROPERTIES_ERROR, LOAD_PROPERTIES_SUCCESS,
	SET_ADDPROPERTY_DIALOG_DIALOG_VISIBILITY } from './actionTypes';
import { setInterval } from 'timers';

export const setPropertyDialogVisible = () => {
	return dispatch => {
		dispatch({type: SET_ADDPROPERTY_DIALOG_DIALOG_VISIBILITY});
	}
}

export const saveProperty = (model) => {
	return dispatch => {
		dispatch({type: SAVE_PROPERTY, payload: model});
		return fetch(API_ROOT.concat("property/save"), 
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Accept-Encoding': 'gzip',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(model)
			})
			.then(result => {return result.json()})
			.then(response => {
				let action = SAVE_PROPERTY_ERROR;
				//const response = result.text();
				if(response != '-1')
					action = SAVE_PROPERTY_SUCCESS;
				dispatch({type: action, payload: response});
				//resetFlagsTimedActivity(dispatch, 'save');
			})
			.catch(error => {
				dispatch({type: SAVE_PROPERTY_ERROR, payload:error});
				//resetFlagsTimedActivity(dispatch, 'save');
			})
	}
}

/* export const resetFlagsTimedActivity = (dispatcher, activityFor) => {
	switch(activityFor){
		case 'save':
		setInterval(clearStatesForSave, 200, [dispatcher, activityFor]);
	}
} */

export const clearStates = (args) => {
	//let dispatch = args[0];
	const activityFor = args;//[1]
	switch(activityFor){
		case 'save':
		return (dispatch) => {
			dispatch({type:'SAVE_PROPERTY_RESET'})};
	}
}

export const getAllProperties = () => {
	return dispatch => {
		dispatch({type: LOAD_PROPERTIES});
		return fetch(API_ROOT.concat("/property/getAll"))
			.then(result => {
				return result.body ? result.json() : [];
			})
			.then(jsonResult => {
				dispatch({type: LOAD_PROPERTIES_SUCCESS, payload:jsonResult});
			})
			.catch((error) => {
				dispatch({type: LOAD_PROPERTIES_ERROR, payload:error});
			})
	}
}