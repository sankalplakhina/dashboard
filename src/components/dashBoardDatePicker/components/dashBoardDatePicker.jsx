import React from 'react';
import cx from 'classnames';
import { defaultRanges, Calendar, DateRange } from 'react-date-range';

class DashboardDatePicker extends React.Component {

	constructor(props, context) {
		super(props, context);
	    this.state = {
	    	showDatePicker: false,
	    	predefined: {
	    		startDate: '',
	    		endDate: ''
	    	},
	    };
	    this.onDateRangeChange = this.onDateRangeChange.bind(this);
	    this.onInputClick = this.onInputClick.bind(this);
	}

	onInputClick() {
		this.setState({
			showDatePicker : !this.state.showDatePicker
		});
	}

	onDateRangeChange(payload) {
		this.setState({
			predefined : payload
		});
	}

	render() {
		const { predefined, showDatePicker } = this.state;
		const format = 'dddd, D MMMM YYYY';
		return (
			<div className="dbDatePicker pull-right">
				<div className="dates">
					<input
					  type='text'
					  readOnly
					  onClick={this.onInputClick}
					  value={ predefined['startDate'] && predefined['startDate'].format(format).toString() }
					/>
					<input
					  type='text'
					  readOnly
					  onClick={this.onInputClick}
					  value={ predefined['endDate'] && predefined['endDate'].format(format).toString() }
					/>
				</div>
				<div className={cx("dateRange", {"show": showDatePicker})}>
					<DateRange
						linkedCalendars={ true }
						ranges={ defaultRanges }
						onInit={ this.onDateRangeChange }
						onChange={ this.onDateRangeChange }
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

export default DashboardDatePicker;
