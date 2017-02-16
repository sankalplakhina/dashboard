import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import cx from 'classnames';
import DbTable from 'src/js/components/dashboard/components/DbTable';

class ReviewTable extends React.Component {

	constructor(){
		super();
	}

	handlePreviousClick() {
		const { onPreviousButtonClick, data: { prev } } = this.props;
		onPreviousButtonClick(prev);
	}

	handleNextClick() {
		const { onNextButtonClick, data: { next } } = this.props;
		onNextButtonClick(next);
	}

	render () {

		const { data } = this.props;
		const { total, count, offset } = data;

		const isOffsetZero = (offset === 0);
		const start = isOffsetZero? 1 : offset;
		const end = offset + count;

		return (
			<div>
				<div className="reviewDatatable_wrapper dataTables_wrapper no-footer">
					<div className="top">
						<div className="dataTables_info">
							<strong>{`${start}-${end}`}</strong>{" of "}<strong>{total}</strong>
						</div>
						<div className="dataTables_paginate paging_simple_numbers pull-left">
							<a className={cx("paginate_button previous", {'disabled': isOffsetZero})}
								onClick={this.handlePreviousClick}
							/>
							<a className={cx("paginate_button next", {'disabled': (end === total)})}
								onClick={this.handleNextClick} />
						</div>
					</div>
				</div>
				<DbTable
					className="reviewDatatable"
					data={data}
					searchEnabled={true} />
			</div>
		);
	}
}

export default bindHandlers(ReviewTable);
