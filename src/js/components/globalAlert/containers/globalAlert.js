import { connect } from 'react-redux';
import GlobalAlert from '../components/globalAlert';
import { getIsGlobalAlertActive, getGlobalAlertText } from '../selectors';
import { closeGlobalAlert } from '../actions';
import { getActiveRoute } from 'src/js/components/appContainer/selectors/appContainerSelectors';


function mapStateToProps(state) {
	return {
		isActive: getIsGlobalAlertActive(state),
		alertText: getGlobalAlertText(state),
		activeRoute: getActiveRoute(state),
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onHide(){
			dispatch(closeGlobalAlert())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAlert);