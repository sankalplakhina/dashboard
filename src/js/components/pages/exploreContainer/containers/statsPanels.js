import { connect } from 'react-redux';
import StatsPanels from '../components/statsPanels';
import {
  getExploreStatsPanelsData,
  getStatsPanelAPI,
  getIsStatsPanelsLoading
} from '../selectors/exploreContainerSelectors';
import { loadStatsPanels } from '../actions/exploreContainerActions';

function mapStateToProps(state) {
  	return {
  		data: getExploreStatsPanelsData(state),
        isLoaded: !getIsStatsPanelsLoading(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {
  		onNextButtonClick(nextApiLink) {
  			dispatch(loadStatsPanels(nextApiLink));
  		},
  		onPreviousButtonClick(prevApiLink) {
  			dispatch(loadStatsPanels(prevApiLink));
  		}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPanels);