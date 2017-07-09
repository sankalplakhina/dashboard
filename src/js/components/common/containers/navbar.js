import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isAuthViewSelector, getIsActivateView } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import { getUserData } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { logout as onLogoutClick } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';

import Navbar from '../components/navbar';

function mapStateToProps(state) {
  	return {
  		addFakeNavSpace: !isAuthViewSelector(state),
  		userInfo: getUserData(state),
  		isEnabled: !getIsActivateView(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onLogoutClick
  	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { isNotFoundComponent } = ownProps;
	const mergeProps = {};
	if (isNotFoundComponent) {
		mergeProps.addFakeNavSpace = false;
	}
  	return _.defaults(mergeProps, stateProps, dispatchProps, ownProps);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Navbar));