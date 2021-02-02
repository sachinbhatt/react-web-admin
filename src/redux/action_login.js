import { LOGIN_REQUEST, LOGIN_STATUS, LOGIN_FAILURE, LOGOUT_REQUEST} from '../util/AppConstants';
import React from 'react';


export const loginRequest = ({username,password,checked}) => {
  console.log("action login request");
  console.log(username);
  console.log(password);
  if(!username)
  {
    return dispatch => {
		  dispatch({type: LOGIN_FAILURE,payload:'Please enter Username!'});
    }

  }
  else if(!password)
  {
    return dispatch => {
		  dispatch({type: LOGIN_FAILURE,payload:'Please enter Password!'});
    }
  }
  else if(username=='admin' && password=='admin')
  {
    localStorage.setItem('isLoggedin',true);
    localStorage.setItem('userid',username);
    if(checked)
    {
      localStorage.setItem('checked_user',username);
    }
    else
    {
      localStorage.setItem('checked_user',''); 
    }
    return dispatch => {
      dispatch({type: LOGIN_REQUEST,payload:{username,password}});
    }
  }
  else
  {
    return dispatch => {
		  dispatch({type: LOGIN_FAILURE,payload:'Incorrect Username and Password!'});
    }
  }
}
export function logoutRequest({username,password}) {
  console.log('Logout Request');
  localStorage.removeItem('isLoggedin');
  localStorage.removeItem('userid');
  return dispatch => {
    dispatch({type: LOGOUT_REQUEST,payload:{username,password}});
  }
}

export function loginStatus() {
  console.log('Login Status');
  return dispatch => {
    dispatch({type: LOGIN_STATUS});
  }
}