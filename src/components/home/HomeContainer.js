import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Home from './Home';
import {loginStatus} from '../../redux/action_login';

const mapDispatchToProps = {
	loginStatus
};


const mapStateToProps = globalState => {
	return {
		isLoggedOut: globalState.login.isLoggedOut,
		isLoggedin: globalState.login.isLoggedin
	};
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));