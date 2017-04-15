import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';

class StatsPanelHeader extends React.Component {
	constructor(){
		super();
		this.state = {
			isDecisionOptionsOpen: false
		};
	}

	handleCollapsedButtonClick(){
		this.props.onSelect(this.props.idx);
	}

	handleDecisionButtonClick(){
		this.setState({
			isDecisionOptionsOpen: !this.state.isDecisionOptionsOpen
		})
	}

	handleDecisionButtonBlur(){
		if (this.state.isDecisionOptionsOpen) {
			this.handleDecisionButtonClick();
		}
	}

	render() {
		const { data, cols, idx, onSelect, isExpanded, disableCollapse } = this.props;
		const { isDecisionOptionsOpen } = this.state;
		return (
			<div className="row">
				{
					cols.map((column, idx) => {
						switch(column){
							case 'score':
								return (
									<div className="col-sm-2" key={idx}>
										<h4>
											<img src={`/public/static/images/${data[column].icon}`} />
											{data[column].count}
										</h4>
									</div>
								);
							case 'order':
								return (
									<div className="col-sm-4" key={idx}>
										<Link to={`/order/${data[column].title}`}>
											<strong className={cx({"colorRed": data[column].risky})}>{data[column].title}</strong>
										</Link>
										{data[column].paras.map((para, idx)=> <p className="para" key={idx}>{para}</p>)}
									</div>
								);
						}
					})
				}
				<div className="col-sm-5">
					<div
						className={cx("dropdown makeDecisions pull-right", {
							"open": isDecisionOptionsOpen
						})}
						tabIndex="-1"
						onClick={this.handleDecisionButtonClick}
						onBlur={this.handleDecisionButtonBlur}
						>
						<button className="btn btn-default dropdown-toggle" type="button">
							<span className="value">Make a descison</span>
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							<li><a href="javascript:void(0)">Approve</a></li>
							<li><a href="javascript:void(0)">Reject</a></li>
						</ul>
					</div>
				</div>
				{
					!disableCollapse &&
					<div className="col-sm-1 text-right" onClick={this.handleCollapsedButtonClick}>
						<a role="button" className={cx({"collapsed": !isExpanded})} />
					</div>
				}
			</div>
		);
	}
}

export default bindHandlers(StatsPanelHeader);
