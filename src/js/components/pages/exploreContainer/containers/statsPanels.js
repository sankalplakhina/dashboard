import { connect } from 'react-redux';
import StatsPanels from '../components/statsPanels';
import {
  getExploreOrdersData,
  getIsExploreOrdersLoading,
  getExploreOrdersPrevApiUrl,
} from '../selectors/exploreContainerSelectors';
import {
    loadStatsPanelsWithNextQuery,
    loadStatsPanelsWithPrevLink,
} from '../actions/exploreContainerActions';

function mapStateToProps(state) {
  	return {
  		data: getExploreOrdersData(state),
        prevApiLink: getExploreOrdersPrevApiUrl(state),
        isLoaded: !getIsExploreOrdersLoading(state),
  	};
}

function mapDispatchToProps(dispatch) {
  	return {
  		onNextButtonClick(nextQuery) {
  			dispatch(loadStatsPanelsWithNextQuery(nextQuery));
  		},
  		onPreviousButtonClick(prevApiLink) {
  			dispatch(loadStatsPanelsWithPrevLink(prevApiLink));
  		}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPanels);