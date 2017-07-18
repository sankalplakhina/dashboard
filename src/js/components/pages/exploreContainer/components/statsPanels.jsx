import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import StatsPanel from './statsPanel';
import loadingGif from 'public/static/images/loading.gif';

class StatsPanels extends React.Component {

	constructor(){
		super();
		this.state = {
			isSortDropdownOpen: false
		};
	}

	handleSortButtonClick(){
		this.setState({
			isSortDropdownOpen: !this.state.isSortDropdownOpen
		})
	}

	handleSortButtonBlur(){
		if (this.state.isSortDropdownOpen) {
			this.handleSortButtonClick();
		}
	}

	handlePreviousClick() {
		const { onPreviousButtonClick, prevApiLink, isExploreOrdersLoading } = this.props;
		if (!isExploreOrdersLoading){
			onPreviousButtonClick(prevApiLink);
		}
	}

	handleNextClick() {
		const { onNextButtonClick, data: { next }, isExploreOrdersLoading } = this.props;
		if (!isExploreOrdersLoading) {
			onNextButtonClick(next);
		}
	}

	render(){

		const { data, prevApiLink, paginationData, isExploreOrdersLoading } = this.props;

		if (data) {
			const { rows, next } = data;
			const { start, end, total } = paginationData;
			const { isSortDropdownOpen } = this.state;

			return (
				<div className="expPaginate">
					<div className="col-md-6 nopad bottomPad15 lh32">
						<div className="dataTables_paginate paging_simple_numbers pull-left">
							<a className={cx("paginate_button previous", {'disabled': !prevApiLink || isExploreOrdersLoading})}
								onClick={prevApiLink? this.handlePreviousClick: _.noop}
							/>
							<a className={cx("paginate_button next", {'disabled': !next || isExploreOrdersLoading})}
								onClick={next? this.handleNextClick: _.noop} />
						</div>
			    		{isExploreOrdersLoading && <figure className="table-loader"><img src={loadingGif} /></figure>}
						<div className="page-text dataTables_info pull-left">
							<strong>{`${isExploreOrdersLoading? 'Loading' : 'Showing'} ${start} to ${end} orders`}</strong>
						</div>
					</div>
					<div className="hidden col-md-6 text-right nopad bottomPad15 lh32">
						<label className="mr5">Sort by</label>
						<div
							className={cx("dropdown pull-right", {"open": isSortDropdownOpen })}
							tabIndex="-1"
							onClick={this.handleSortButtonClick}
							onBlur={this.handleSortButtonBlur}>
							<button className="btn btn-default dropdown-toggle" type="button">
						        <span className="value">Payment Abuse Score</span>
						        <span className="caret"></span>
						    </button>
						    <ul className="dropdown-menu">
						        <li><a href="javascript:void(0)">Action</a></li>
						        <li><a href="javascript:void(0)">Another action</a></li>
						    </ul>
						</div>
                    </div>
					<StatsPanel data={data} />
				</div>
			);
		}
		return null;
	}
}

export default bindHandlers(StatsPanels);
