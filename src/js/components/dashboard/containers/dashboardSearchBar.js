import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DashboardSearchBar from '../components/dashboardSearchBar';
import { fetchSearchText } from '../actions/dashboardSearchBarActions';
import {
	getIsSearchBarLoading,
	getIsSearchBarResponseSuccess,
	getIsSearchBarResponseError,
	getSearchBarLoadingOrderId,
} from '../selectors/dashboardSearchBarSelectors';
import { showGlobalAlert } from 'src/js/components/globalAlert/actions';

function mapStateToProps(state) {
	return {
		isSearchBarLoading: getIsSearchBarLoading(state),
		loadingOrderId: getSearchBarLoadingOrderId(state),
		isSearchBarResponseSuccess: getIsSearchBarResponseSuccess(state),
		isSearchBarResponseError: getIsSearchBarResponseError(state),
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSearch(searchText){
			dispatch(fetchSearchText(searchText));
		},
		onResponseError(responseMessage) {
		    dispatch(showGlobalAlert(responseMessage));
		}
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardSearchBar));