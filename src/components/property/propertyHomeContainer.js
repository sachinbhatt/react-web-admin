import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setPropertyDialogVisible} from './actions';
import PropertyHome from './propertyHome';

const mapDispatchToProps = {
	setPropertyDialogVisible,
};

const mapStateToProps = globalState => {
	return {
		isAddPropModalOpen: globalState.property.isAddPropModalOpen
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyHome));