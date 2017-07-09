import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ActivateContainer from '../components/activateContainer';
import { getRouteQueryParams } from 'src/js/components/appContainer/selectors/appContainerSelectors';

function mapStateToProps(state) {
	const { success, message } = getRouteQueryParams(state);
  	return {
  		success: success === "true", // params received are in string
  		message
  	};
}

export default withRouter(connect(mapStateToProps)(ActivateContainer));