import { connect } from 'react-redux';
import { isLoginOrRegisterViewSelector } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import { isAuthDataLoaded, getUserData } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import Navbar from '../components/navbar';

function mapStateToProps(state) {
  	return {
  		addFakeNavSpace: !isLoginOrRegisterViewSelector(state),
  		userInfo: isAuthDataLoaded(state) && getUserData(state),
  	};
}

export default connect(mapStateToProps)(Navbar);