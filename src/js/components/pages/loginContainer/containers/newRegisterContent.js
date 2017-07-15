import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {
	getIsRegisterationLoading,
	getIsResponseSuccess,
	getResponseMessage,
	getResponseErrors,
} from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { register } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';
import NewRegisterContent from '../components/newRegisterContent';
import { showGlobalAlert } from 'src/js/components/globalAlert/actions';

function mapStateToProps(state) {
  	return {
  		isRegisterationLoading: getIsRegisterationLoading(state),
  		isResponseSuccess: getIsResponseSuccess(state),
  		responseMessage: getResponseMessage(state),
  		responseErrors: getResponseErrors(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onRegisterSubmit({ username, password, website }) {
  			dispatch(register({ username, password, website }))
  		},
        onResponseMessage(responseMessage) {
            dispatch(showGlobalAlert(responseMessage));
        }
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewRegisterContent));