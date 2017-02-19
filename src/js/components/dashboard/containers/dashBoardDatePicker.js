import { connect } from 'react-redux';
import DashboardDatePicker from '../components/dashboardDatePicker';
import {
	isDatePickerVisibleSelector,
	dateRangeSelector,
  getDateFormat,
} from '../selectors/dashboardDatePickerSelectors';
import { setIsDatePickerVisible, setDateRange } from '../actions/dashboardDatePickerActions';

function mapStateToProps(state) {
  	return {
  		isDatePickerVisible: isDatePickerVisibleSelector(state),
  		dateRange: dateRangeSelector(state),
      format: getDateFormat(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {
  		onDatePickerClick(isDatePickerVisible) {
  			dispatch(setIsDatePickerVisible(!isDatePickerVisible));
  		},
  		onDateRangeSelection(dateRange) {
  			dispatch(setDateRange(dateRange));
  		}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDatePicker);