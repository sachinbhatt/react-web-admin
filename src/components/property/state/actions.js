import { STATE_ITEM_SELECTION, LOAD_CITIES_SUCCESS, LOAD_CITIES_ERROR } from '../actionTypes';
import {API_ROOT} from '../../../util/AppConstants';

/**
 * Make a call to fetch states associated with the selected country...
 */

export const stateItemSelection = (item) => {
	return dispatch => {
		dispatch ({type: STATE_ITEM_SELECTION, payload: item});
		return fetch(API_ROOT.concat(`city/get/state/id/${item.id}`))	//fetch(API_ROOT.concat(`city/get/state/id/${item.id}`))
			.then( (response) => {
				return response.json();
			})
			.then( (jsonResult) => {
				dispatch({type: LOAD_CITIES_SUCCESS, payload: jsonResult})
			})
			.catch((error) => {
				dispatch({type: LOAD_CITIES_ERROR, payload: error});
			})
	}
}
