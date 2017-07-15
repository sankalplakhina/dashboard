import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {
	getIsLoginLoading,
	getIsResponseSuccess,
	getResponseMessage,
	getResponseErrors,
} from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { login } from '../actions/loginContainerActions';
import NewLoginContent from '../components/newLoginContent';
import { showGlobalAlert } from 'src/js/components/globalAlert/actions';

function mapStateToProps(state) {
  	return {
  		isLoginLoading: getIsLoginLoading(state),
  		isResponseSuccess: getIsResponseSuccess(state),
  		responseMessage: getResponseMessage(state),
  		responseErrors: getResponseErrors(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onLoginSubmit(username, password) {
  			dispatch(login({ username, password }));
  		},
        onResponseMessage(responseMessage) {
            dispatch(showGlobalAlert(responseMessage));
        }
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewLoginContent));