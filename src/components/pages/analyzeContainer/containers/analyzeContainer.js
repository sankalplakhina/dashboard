import { asyncConnect } from 'redux-connect';
import { load } from '../actions/analyzeContainerActions';
import { isAnalyzeDataLoaded } from '../selectors/analyzeContainerSelectors';
import AnalyzeContainer from '../components/analyzeContainer';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();
    	if (!isAnalyzeDataLoaded(state)) {
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