import { connect } from 'react-redux';
import ExploreContent from '../components/exploreContent';
import { getExploreOverviewData } from '../selectors/exploreContainerSelectors';

function mapStateToProps(state) {
  	return {
  		data: getExploreOverviewData(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContent);