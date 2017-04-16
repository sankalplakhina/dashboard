import { asyncConnect } from 'redux-connect';
import { load } from '../actions/exploreContainerActions';
import { isExploreDataLoaded } from '../selectors/exploreContainerSelectors';
import ExploreContainer from '../components/exploreContainer';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();
    	if (!isExploreDataLoaded(state)) {
    		return dispatch(load());
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
  			dispatch(load())
  		}
  	};
}

export default asyncConnect([asyncProps], mapStateToProps, mapDispatchToProps)(ExploreContainer);