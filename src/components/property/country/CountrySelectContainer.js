import {connect} from 'react-redux';
import { getAllCountries, getCountryByName, countryItemSelection } from './actions';
import CountrySelect from './CountrySelect';

const mapDispatchToProps = {
	getAllCountries,
	getCountryByName,
	countryItemSelection
};

const mapStateToProps = globalState => {
	return {
	countryList: (typeof (globalState.csc.countryList) === 'object' ? [globalState.csc.countryList ] : globalState.csc.countryList),
	selectedCountry: globalState.csc.selectedCountry
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect);