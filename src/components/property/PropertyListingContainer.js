import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getAllProperties} from './actions';
import PropertyListing from './propertyListing';

const mapDispatchToProps = {
	getAllProperties,
};

const mapStateToProps = globalState => {
	return {
		propertyList: globalState.property.propertyList,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyListing));