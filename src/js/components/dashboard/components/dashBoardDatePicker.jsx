import React from 'react';
import cx from 'classnames';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { bindHandlers } from 'react-bind-handlers';

class DashboardDatePicker extends React.Component {

	constructor(props, context) {
		super();
	}

	handleMenuItemSelection(eventKey) {
		const { dayBuckets, onDayBucketSelection } = this.props;
		onDayBucketSelection(dayBuckets[eventKey]);
	}

	render() {

		const { dayBucket, dayBuckets } = this.props;
		return (
			<div className="dbDatePicker pull-right">
				<SplitButton
					title={dayBucket.label}
					id="dropdown-date-picker"
					onSelect={this.handleMenuItemSelection}>
					{
						dayBuckets.map((item, index) => {
							return (
								<MenuItem
									eventKey={index}
									key={index}
									>
									{item.label}
								</MenuItem>
							);
						})
					}
				</SplitButton>
			</div>
		);
	}
}

export default bindHandlers(DashboardDatePicker);
