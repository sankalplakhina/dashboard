import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isLoginOrRegisterViewSelector } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import { isAuthDataLoaded, getUserData } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { logout } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';

import Navbar from '../components/navbar';

function mapStateToProps(state) {
  	return {
  		addFakeNavSpace: !isLoginOrRegisterViewSelector(state),
  		userInfo: isAuthDataLoaded(state) && getUserData(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onLogoutClick(){
  			dispatch(logout(ownProps.router));
  		}
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));