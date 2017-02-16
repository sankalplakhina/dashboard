import { connect } from 'react-redux';
import ReviewContent from '../components/reviewContent';
import { getReviewData } from '../selectors/reviewContainerSelectors';

function mapStateToProps(state) {
  	return {
  		data: getReviewData(state)
  	};
}

export default connect(mapStateToProps)(ReviewContent);