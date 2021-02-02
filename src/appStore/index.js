import {createStore, applyMiddleware, combineReducers} from 'redux';
import {propertyReducer, countryStateCityReducer} from '../components/property/reducer';
import thunk from 'redux-thunk';
import {reducer as reduxFormReducer} from 'redux-form';
import { appReducer } from '../appReducer';
import {loginReducer} from '../redux/reducer_login';

const combinedReducer = combineReducers({
  app: appReducer,
	csc: countryStateCityReducer,
	property: propertyReducer,
	login: loginReducer,
	form: reduxFormReducer
});
export const AppStore = createStore(combinedReducer, applyMiddleware(thunk));
// console.log("AppStore >>", propertyReducer);
