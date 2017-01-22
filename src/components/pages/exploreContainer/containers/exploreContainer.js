import { asyncConnect } from 'redux-connect';
import { load } from '../actions/exploreContainerActions';
import { exploreDataLoaded } from '../selectors/exploreContainerSelectors';
import ExploreContainer from '../components/exploreContainer';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();
    	if (!exploreDataLoaded(state)) {
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

export default asyncConnect([asyncProps], mapStateToProps, mapDispatchToProps)(ExploreContainer);