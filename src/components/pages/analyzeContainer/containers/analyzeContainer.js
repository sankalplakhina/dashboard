import { asyncConnect } from 'redux-connect';
import { load } from '../actions/analyzeContainerActions';
import { analyzeDataLoaded } from '../selectors/analyzeContainerSelectors';
import AnalyzeContainer from '../components/analyzeContainer';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();
    	if (!analyzeDataLoaded(state)) {
    		return dispatch(load());
    	}
    	return null;
    }
};

function mapStateToProps(state) {
  	return {};
}

function mapDispatchToProps(dispatch) {
  	return {};
}

export default asyncConnect([asyncProps], mapStateToProps, mapDispatchToProps)(AnalyzeContainer);