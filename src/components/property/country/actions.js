import {LOAD_COUNTRIES, LOAD_COUNTRIES_SUCCESS, LOAD_COUNTRIES_ERROR,
		LOAD_STATES_SUCCESS, LOAD_STATES_ERROR, COUNTRY_ITEM_SELECTION, STATE_ITEM_SELECTION, LOAD_CITIES_SUCCESS, LOAD_CITIES_ERROR} from '../actionTypes';
import {API_ROOT} from '../../../util/AppConstants';

/**
 * Make a call to fetch all the countries...
 */
export const getAllCountries = () => {
		return dispatch => {
			dispatch({type: LOAD_COUNTRIES});
			// const url = API_ROOT.concat("country/getAll")
			return fetch(API_ROOT.concat("country/getAll"))
			.then( (response) => {
				return response.json();
			})
			.then( (jsonResult) => {
				dispatch({type: LOAD_COUNTRIES_SUCCESS, payload: jsonResult})
			})
			.catch((error) => {
				dispatch({type: LOAD_COUNTRIES_ERROR, payload: error});
			})
		}
}

/**
 * Make a call to fetch a country by name...
 */
export const getCountryByName = (name) => {
  return dispatch => {
    dispatch({type: LOAD_COUNTRIES});
    return fetch(API_ROOT.concat(`country/get/name/${name}`))
    .then( (response) => {
      return response.json();
    })
    .then( (jsonResult) => {
      dispatch({type: LOAD_COUNTRIES_SUCCESS, payload: jsonResult})
    })
    .catch((error) => {
      dispatch({type: LOAD_COUNTRIES_ERROR, payload: error});
    })
  }
}

export const countryItemSelection = (item) => {
	return dispatch => {
		dispatch ({type: COUNTRY_ITEM_SELECTION, payload: item});
		return fetch(API_ROOT.concat(`state/get/country/id/${item.id}`)) //fetch(API_ROOT.concat(`state/get/country/id/${item.id}`))
			.then( (response) => {
				return response.json();
			})
			.then( (jsonResult) => {
				dispatch({type: LOAD_STATES_SUCCESS, payload: jsonResult})
			})
			.catch((error) => {
				dispatch({type: LOAD_STATES_ERROR, payload: error});
			})
	}
}

/* export const getAllCountriesError = (error) => {
	return {type: LOAD_COUNTRIES_ERROR, payload: error};
}

export const getAllCountriesSuccess = (result) => {
	return {type: LOAD_COUNTRIES_SUCCESS, payload: result};
}
 */