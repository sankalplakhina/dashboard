import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isAuthViewSelector } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import { getUserData } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { logout as onLogoutClick } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';

import Navbar from '../components/navbar';

function mapStateToProps(state) {
  	return {
  		addFakeNavSpace: !isAuthViewSelector(state),
  		userInfo: getUserData(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onLogoutClick
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));