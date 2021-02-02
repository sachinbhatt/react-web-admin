import {LOAD_COUNTRIES, LOAD_COUNTRIES_SUCCESS,
	LOAD_STATES, LOAD_STATES_SUCCESS,
	LOAD_CITIES, LOAD_CITIES_SUCCESS,
	LOAD_COUNTRIES_ERROR, LOAD_STATES_ERROR, LOAD_CITIES_ERROR,
	COUNTRY_ITEM_SELECTION, STATE_ITEM_SELECTION, CITY_ITEM_SELECTION,
	SET_ADDPROPERTY_DIALOG_DIALOG_VISIBILITY,
	SAVE_PROPERTY, SAVE_PROPERTY_SUCCESS, SAVE_PROPERTY_ERROR,
	LOAD_PROPERTIES_SUCCESS, LOAD_PROPERTIES_ERROR, LOAD_PROPERTIES} from './actionTypes';

import {PropertyModel} from './model';

const countryStateCityInitState = {
	countryList: [],
	countryMenuItems: [],
	selectedCountry: {name: "", id: -1},
	countryListLoadError: "",

	stateList: [],
	stateMenuItems: [],
	selectedState: {name: "", id: -1},
	stateListLoadError: "",

	cityList: [],
	cityMenuItems: [],
	selectedCity: {name: "", id: -1},
	cityListLoadError: "",
}

export const countryStateCityReducer = (state = countryStateCityInitState, action) => {
	// console.log("PropertyReducer >> ", state, action);
	switch(action.type){
		case LOAD_COUNTRIES:
			return {
				...state,
			};
		
		case LOAD_COUNTRIES_SUCCESS:
			return {
				...state,
				countryList: action.payload
			};
		
		case LOAD_COUNTRIES_ERROR:
			return {
				...state,
				countryListLoadError: action.payload
		};

		case COUNTRY_ITEM_SELECTION:
			return {
				...state,
				selectedCountry: action.payload
			};

		case LOAD_STATES:
			return {
				...state,
				selectedCountry: action.selectedCountry
			};
		
		case LOAD_STATES_SUCCESS:
			return {
				...state,
				stateList: action.payload
			};
		
		case LOAD_STATES_ERROR:
			return {
				...state,
				stateListLoadError: action.payload
		};

		case STATE_ITEM_SELECTION:
			return {
				...state,
				selectedState: action.payload
			};

		case LOAD_CITIES:
			return {
				...state,
				selectedState: action.selectedState
			};
		
		case LOAD_CITIES_SUCCESS:
			return {
				...state,
				cityList: action.payload
			};

		case LOAD_CITIES_ERROR:
			return {
				...state,
				cityListLoadError: action.payload
		};

		case CITY_ITEM_SELECTION:
			return {
				...state,
				selectedCity: action.payload
			};
		default:
			return {...state};
	}
}

const propertyInitialState = {
	saving: false,
	saved: false,
	saveError: '',
	loading: false,
	updated: false,
	model: PropertyModel,
	propertyList: [],
	isAddPropModalOpen: false
}

export const propertyReducer = (state = propertyInitialState, action) => {
	switch(action.type){
		case SAVE_PROPERTY:
			return {
				...state,
				saving: true,
				saved: false,
				saveError: ''
			}
			
		case SAVE_PROPERTY_SUCCESS:
			return {
				...state,
				saving: false,
				saved: true,
				saveError: '',
				id: action.payload
			}

		case SAVE_PROPERTY_ERROR:
			return {
				...state,
				saving: false,
				saved: false,
				saveError: `Error while saving property: Returned ${action.payload}`
			}
			
		case 'SAVE_PROPERTY_RESET':
			return {
				...state,
				saving: false,
				saved: false,
				saveError: ''
			}
		
		case LOAD_PROPERTIES:
			return{
				...state,
				loading: true
			}

		case LOAD_PROPERTIES_SUCCESS:
			return{
				...state,
				propertyList: action.payload,
				loading: false
			}
			
		case LOAD_PROPERTIES_ERROR:
			return{
				...state,
				propertyList: [],
				error: action.payload,
				loading: false
			}
		
		case SET_ADDPROPERTY_DIALOG_DIALOG_VISIBILITY:
			return {
				...state,
				isAddPropModalOpen: !state.isAddPropModalOpen
			}
		default:
			return {...state};
	}
}
