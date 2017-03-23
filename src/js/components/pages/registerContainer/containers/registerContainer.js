import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {
	getIsRegisterationLoading,
	getIsRegisterationSuccess,
	getResponseMessage,
} from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { register } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';
import RegisterContainer from '../components/registerContainer';

function mapStateToProps(state) {
  	return {
  		isRegisterationLoading: getIsRegisterationLoading(state),
  		isRegisterationSuccess: getIsRegisterationSuccess(state),
  		responseMessage: getResponseMessage(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onRegisterSubmit({ username, password, website }) {
  			dispatch(register({ username, password, website }))
  		},
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));