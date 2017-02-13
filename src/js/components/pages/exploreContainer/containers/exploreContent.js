import { connect } from 'react-redux';
import ExploreContent from '../components/exploreContent';
import { getExploreData } from '../selectors/exploreContainerSelectors';

function mapStateToProps(state) {
  	return {
  		data: getExploreData(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContent);