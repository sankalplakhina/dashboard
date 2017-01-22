import { connect } from 'react-redux';
// import { load } from '../actions/analyzeContainerActions';
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

function mapDispatchToProps(dispatch) {
  	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);