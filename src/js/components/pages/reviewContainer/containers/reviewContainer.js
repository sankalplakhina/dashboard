import { asyncConnect } from 'redux-connect';
import { loadReviewWithQuery } from '../actions/reviewContainerActions';
import { reviewDataLoaded } from '../selectors/reviewContainerSelectors';
import ReviewContainer from '../components/reviewContainer';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();
    	if (!reviewDataLoaded(state)) {
    		return dispatch(loadReviewWithQuery());
    	}
    	return null;
    }
};

function mapStateToProps(state) {
  	return {};
}

function mapDispatchToProps(dispatch) {
  	return {
  		onUpdateView(){
  			dispatch(loadReviewWithQuery())
  		}
  	};
}

export default asyncConnect([asyncProps], mapStateToProps, mapDispatchToProps)(ReviewContainer);