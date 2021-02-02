import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({ component: Component, userLoggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    userLoggedIn ? (
      <Component {...props}/>  
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
  
)

export default PrivateRoute;

/*
state: { from: props.location }
props.isLoginSuccess


const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.login.isLoginSuccess,
  };
};

export const PrivateRoute = connect(mapStateToProps,null)(privateroute); 
*/