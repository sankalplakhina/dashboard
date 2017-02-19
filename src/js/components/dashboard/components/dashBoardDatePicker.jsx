import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { bindHandlers } from 'react-bind-handlers';
import defaultRanges from 'react-date-range/lib/defaultRanges';
import Calendar from 'react-date-range/lib/Calendar';
import DateRange from 'react-date-range/lib/DateRange';

class DashboardDatePicker extends React.Component {

	constructor(props, context) {
		super();
	}

	handleDatePickerClick() {
		const { isDatePickerVisible, onDatePickerClick } = this.props;
		onDatePickerClick(isDatePickerVisible);
	}

	handleDateRangeSelection(payload) {
		const { onDateRangeSelection, format } = this.props;
		onDateRangeSelection({
			startDate: payload.startDate.format(format),
			endDate: payload.endDate.format(format),
		});
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
					  value={ `${dateRange['startDate']} - ${dateRange['endDate']}` }
					/>
				</div>
				<div className={cx("dateRange", {"show": isDatePickerVisible})}>
					<DateRange
						startDate={dateRange.startDate}
						endDate={dateRange.endDate}
						linkedCalendars={ true }
						format={format}
						ranges={ defaultRanges }
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

export default bindHandlers(DashboardDatePicker);
