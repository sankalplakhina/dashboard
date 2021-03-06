import { connect } from 'react-redux';
import DashboardDatePicker from '../components/dashBoardDatePicker';
import { getDayBucket, getDayBucketsList } from '../selectors/dashBoardDatePickerSelectors';
import { setDayBucket } from '../actions/dashBoardDatePickerActions';

function mapStateToProps(state) {
	return {
		dayBucket: getDayBucket(state),
		dayBuckets: getDayBucketsList(),
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	const { onUpdateView } = ownProps;
	return {
		onDayBucketSelection(dayBucket) {
			dispatch(setDayBucket(dayBucket)); // updates store with state and loaded flag of all views
			onUpdateView(); // triggers update on current view
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDatePicker);