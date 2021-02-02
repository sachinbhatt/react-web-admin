import {connect} from 'react-redux';
import { stateItemSelection } from './actions';
import StateSelect from './StateSelect';

const mapDispatchToProps = {
	stateItemSelection
};

const mapStateToProps = globalState => {
	return {
		stateList: globalState.csc.stateList,
		selectedState: globalState.csc.selectedState
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StateSelect);