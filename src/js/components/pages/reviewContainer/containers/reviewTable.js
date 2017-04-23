import { connect } from 'react-redux';
import ReviewTable from '../components/reviewTable';
import {
	getReviewPrevApiUrl,
	getReviewPaginationData,
	getReviewNextQuery,
} from '../selectors/reviewContainerSelectors';
import {
	loadReviewWithNextQuery,
	loadReviewWithPrevLink,
} from '../actions/reviewContainerActions';

function mapStateToProps(state) {
	return {
		paginationData: getReviewPaginationData(state),
		prevApiLink: getReviewPrevApiUrl(state),
		nextQuery: getReviewNextQuery(state),
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onNextButtonClick(nextQuery) {
			dispatch(loadReviewWithNextQuery(nextQuery));
		},
		onPreviousButtonClick(prevApiLink) {
			dispatch(loadReviewWithPrevLink(prevApiLink));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTable);