import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { login } from '../actions/loginContainerActions';
// import { analyzeDataLoaded } from '../selectors/analyzeContainerSelectors';
import LoginContainer from '../components/loginContainer';

// const asyncProps = {
//     promise: ({ store: { dispatch, getState } }) => {
//     	const state = getState();
//     	if (!analyzeDataLoaded(state)) {
//     		return dispatch(load());
//     	}
//     	return null;
//     }
// };

function mapStateToProps(state) {
  	return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onLoginSubmit(username, password) {
  			dispatch(login({ username, password }, ownProps.router));
  		},
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));