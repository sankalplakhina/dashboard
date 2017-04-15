import { connect } from 'react-redux';
import DashboardDatePicker from '../components/dashboardDatePicker';
import { getDayBucket, getDayBucketsList } from '../selectors/dashboardDatePickerSelectors';
import { setDayBucket } from '../actions/dashboardDatePickerActions';

function mapStateToProps(state) {
  	return {
  		dayBucket: getDayBucket(state),
      dayBuckets: getDayBucketsList(),
  	};
}

function mapDispatchToProps(dispatch) {
  	return {
  		onDayBucketSelection(dayBucket) {
  			dispatch(setDayBucket(dayBucket));
  		}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDatePicker);