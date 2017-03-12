import { connect } from 'react-redux';
import { isLoginOrRegisterViewSelector } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import Footer from '../components/footer';

function mapStateToProps(state) {
  	return {
  		hideFooter: isLoginOrRegisterViewSelector(state)
  	};
}

export default connect(mapStateToProps)(Footer);