import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import StatsPanel from './statsPanel';

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
		const { onPreviousButtonClick, prevApiLink } = this.props;
		onPreviousButtonClick(prevApiLink);
	}

	handleNextClick() {
		const { onNextButtonClick, data: { next } } = this.props;
		onNextButtonClick(next);
	}

	render(){

		const { data, prevApiLink } = this.props;

		if (data) {
			const { rows, next } = data;
			const { isSortDropdownOpen } = this.state;

			return (
				<div className="expPaginate">
					<div className="col-md-6 nopad bottomPad15 lh32">
						<div className="dataTables_paginate paging_simple_numbers pull-left">
							<a className={cx("paginate_button previous", {'disabled': !prevApiLink})}
								onClick={prevApiLink? this.handlePreviousClick: _.noop}
							/>
							<a className={cx("paginate_button next", {'disabled': !next})}
								onClick={next? this.handleNextClick: _.noop} />
						</div>
						{/*<div className="dataTables_info pull-left">
													<strong>{`${start}-${end}`}</strong>{" of "}<strong>{total}</strong>
												</div>*/}
					</div>
					<div className="col-md-6 text-right nopad bottomPad15 lh32">
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
