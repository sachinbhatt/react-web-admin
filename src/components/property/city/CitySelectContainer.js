import {connect} from 'react-redux';
import { cityItemSelection } from './actions';
import CitySelect from './CitySelect';

const mapDispatchToProps = {
	cityItemSelection
};

const mapStateToProps = globalState => {
	return {
		cityList: globalState.csc.cityList,
		selectedCity: globalState.csc.selectedCity
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySelect);