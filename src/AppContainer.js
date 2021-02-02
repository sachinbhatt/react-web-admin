import App from './App';
import { appDrawerOpen, appDrawerClose, drawerLinkOpened } from "./components/navigation/actions";
import {logoutRequest,loginStatus} from './redux/action_login';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapDispatchToProps = {
  appDrawerOpen,
  appDrawerClose,
  drawerLinkOpened,
  logoutRequest,
  loginStatus
};


const mapStateToProps = globalState => {
  return {
    isDrawerOpen: globalState.app.isDrawerOpen,
    activeDrawerLink: globalState.app.activeDrawerLink,
    isLoginSuccess: globalState.login.isLoginSuccess,
    userData: globalState.login.userData,
    isError: globalState.login.isError,
    isLoggedOut: globalState.login.isLoggedOut,
    isLoggedin: globalState.login.isLoggedin
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
