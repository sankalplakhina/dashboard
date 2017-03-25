import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {
	getIsForgotPasswordLoading,
	getIsResponseSuccess,
	getResponseMessage,
} from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { forgotPassword } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';
import ForgotPasswordContainer from '../components/forgotPasswordContainer';

function mapStateToProps(state) {
  	return {
  		isForgotPasswordLoading: getIsForgotPasswordLoading(state),
  		isResponseSuccess: getIsResponseSuccess(state),
  		responseMessage: getResponseMessage(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onSubmit({ username }) {
  			dispatch(forgotPassword({ username }))
  		},
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer));