import React from 'react';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import StatsPanel from './statsPanel';

class StatsPanels extends React.Component {

	handlePreviousClick() {
		const { onPreviousButtonClick, data: { prev } } = this.props;
		onPreviousButtonClick(prev);
	}

	handleNextClick() {
		const { onNextButtonClick, data: { next } } = this.props;
		onNextButtonClick(next);
	}

	render(){

		const { data } = this.props;

		if (data) {
			const { rows, total, count, offset } = data;

			const isOffsetZero = (offset === 0);
			const start = isOffsetZero? 1 : offset;
			const end = offset + count;
			return (
				<div className="expPaginate">
					<div className="col-md-6 nopad bottomPad15 lh32">
						<div className="dataTables_paginate paging_simple_numbers pull-left">
							<a className={cx("paginate_button previous", {'disabled': isOffsetZero})}
								onClick={this.handlePreviousClick}
							/>
							<a className={cx("paginate_button next", {'disabled': (end === total)})}
								onClick={this.handleNextClick} />
						</div>
						<div className="dataTables_info pull-left">
							<strong>{`${start}-${end}`}</strong>{" of "}<strong>{total}</strong>
						</div>
					</div>
					<div className="col-md-6 text-right nopad bottomPad15"></div>
					<StatsPanel data={data} />
				</div>
			);
		}
		return null;
	}
}

export default bindHandlers(StatsPanels);
