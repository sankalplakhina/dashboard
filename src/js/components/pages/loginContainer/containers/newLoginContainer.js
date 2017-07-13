import { connect } from 'react-redux';
import { getIsRegisterView, getIsLoginView } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import NewLoginContainer from '../components/newLoginContainer';

function mapStateToProps(state) {
  	return {
      isLoginView: getIsLoginView(state),
      isRegisterView: getIsRegisterView(state),
  	};
}

export default connect(mapStateToProps)(NewLoginContainer);