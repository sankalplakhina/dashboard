import { connect } from 'react-redux';
import ReviewTable from '../components/reviewTable';
import { load } from '../actions/reviewContainerActions';
// import { getReviewData } from '../selectors/reviewContainerSelectors';

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onNextButtonClick(nextApiLink) {
  			dispatch(load(nextApiLink));
  		},
  		onPreviousButtonClick(prevApiLink) {
  			dispatch(load(prevApiLink));
  		}
  	};
}

export default connect(null, mapDispatchToProps)(ReviewTable);