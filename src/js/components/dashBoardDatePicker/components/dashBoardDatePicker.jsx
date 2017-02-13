import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import defaultRanges from 'react-date-range/lib/defaultRanges';
import Calendar from 'react-date-range/lib/Calendar';
import DateRange from 'react-date-range/lib/DateRange';

class DashboardDatePicker extends React.Component {

	constructor(props, context) {
		super();
		this.handleDatePickerClick = this.handleDatePickerClick.bind(this);
		this.initDateRange = this.initDateRange.bind(this);
		this.handleDateRangeSelection = this.handleDateRangeSelection.bind(this);
	}

	handleDatePickerClick() {
		const { isDatePickerVisible, onDatePickerClick } = this.props;
		onDatePickerClick(isDatePickerVisible);
	}

	initDateRange(payload) {
		const { dateRange, onDateRangeSelection } = this.props;
		onDateRangeSelection(payload);
	}

	handleDateRangeSelection(payload) {
		const { onDateRangeSelection } = this.props;
		onDateRangeSelection(payload);
		this.handleDatePickerClick();
	}

	render() {

		const { format, dateRange, isDatePickerVisible } = this.props;
		return (
			<div className="dbDatePicker pull-right">
				<div className="dates">
					<input
					  type='text'
					  readOnly
					  onClick={this.handleDatePickerClick}
					  value={ `${dateRange['startDate'] && dateRange['startDate'].format(format).toString()} - ${dateRange['endDate'] && dateRange['endDate'].format(format).toString()}` }
					/>
				</div>
				<div className={cx("dateRange", {"show": isDatePickerVisible})}>
					<DateRange
						linkedCalendars={ true }
						ranges={ defaultRanges }
						onInit={this.initDateRange}
						onChange={this.handleDateRangeSelection}
						twoStepChange={true}
						theme={{
						  Calendar : { width: 200 },
						  PredefinedRanges : { marginLeft: 10, marginTop: 10 }
						}}
					/>
				</div>
			</div>
		);
	}
}

DashboardDatePicker.defaultProps = {
	format: 'DD MMM YYYY'
}

export default DashboardDatePicker;
