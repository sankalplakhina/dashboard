import _ from 'lodash';
import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import cx from 'classnames';
import DbTable from 'src/js/components/dashboard/components/dbTable';
import loadingGif from 'public/static/images/loading.gif';

class ReviewTable extends React.Component {

	constructor(){
		super();
	}

	handlePreviousClick() {
		const { onPreviousButtonClick, prevApiLink, isReviewDataLoading} = this.props;
		if (!isReviewDataLoading) {
			onPreviousButtonClick(prevApiLink);
		}
	}

	handleNextClick() {
		const { onNextButtonClick, nextQuery, isReviewDataLoading } = this.props;
		if (!isReviewDataLoading) {
			onNextButtonClick(nextQuery);
		}
	}

	render () {

		const { data, prevApiLink, paginationData, nextQuery, isReviewDataLoading } = this.props;
		const { start, end } = paginationData;

		return (
			<div>
				<div className="reviewDatatable_wrapper dataTables_wrapper no-footer">
					<div className="top">
						<div className="dataTables_info">
							<strong>{`Showing ${start} to ${end} orders`}</strong>
						</div>
			    		{isReviewDataLoading && <figure className="table-loader"><img src={loadingGif} /></figure>}
						<div className="dataTables_paginate paging_simple_numbers pull-left">
							<a className={cx("paginate_button previous", {'disabled': !prevApiLink || isReviewDataLoading})}
								onClick={prevApiLink? this.handlePreviousClick: _.noop}
							/>
							<a className={cx("paginate_button next", {'disabled': !nextQuery || isReviewDataLoading})}
								onClick={nextQuery? this.handleNextClick: _.noop} />
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
