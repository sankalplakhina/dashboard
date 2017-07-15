import { connect } from 'react-redux';
import GlobalAlert from '../components/globalAlert';
import { getIsGlobalAlertActive, getGlobalAlertText } from '../selectors';
import { closeGlobalAlert } from '../actions';

function mapStateToProps(state) {
	return {
		isActive: getIsGlobalAlertActive(state),
		alertText: getGlobalAlertText(state),
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