import { CITY_ITEM_SELECTION } from '../actionTypes';

export const cityItemSelection = (item) => {
	return dispatch => {
		dispatch ({type: CITY_ITEM_SELECTION, payload: item});
	}
}
