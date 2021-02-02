import { LOGIN_REQUEST, LOGIN_STATUS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../util/AppConstants';

let initialState = {
    userData: {
      username: '',      
      password: ''
    },
    isLoginSuccess: false,
    isLoggedOut: true,
    isError:'',
};

export const loginReducer = (state = initialState, action) => {
	switch(action.type){
      case LOGIN_REQUEST:
      console.log('inside the LOGIN_REQUEST reducers');
      console.log(action.payload);
      console.log(state);
      return { 
        userData: action.payload,
        isLoginSuccess: true,
        isLoggedOut: false,
        isError: ""
      };
    case LOGIN_FAILURE:
      console.log('inside the LOGIN_FAILURE reducers')
      console.log(state);
      return {
        isError: action.payload,
        isLoginSuccess: false,
        isLoggedOut: true,
      };
    case LOGOUT_REQUEST:
        console.log('inside the LOGOUT_REQUEST reducers')
        console.log(state);
        return { 
          userData: action.payload,
          isLoggedOut: true,
          isLoginSuccess: false,
          isError: ""
        };
    case LOGIN_STATUS:
          console.log('inside the LOGIN_STATUS reducers')
          console.log(state);
          return { 
           ...state
        };
    default:
      return {...state};
  }
}