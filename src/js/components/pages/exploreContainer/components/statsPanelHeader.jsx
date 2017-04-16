import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';

class StatsPanelHeader extends React.Component {
	constructor(){
		super();
		this.state = {
			isDecisionOptionsOpen: false,
			isDecisionTaken: false,

		};
	}

	componentWillReceiveProps(nextProps) {
		const {
			isDecisionLoading,
			decisionMsg,
		} = nextProps;

		const hasDecisionLoaded = !isDecisionLoading && isDecisionLoading !== this.props.isDecisionLoading;
		if (hasDecisionLoaded && decisionMsg) {
			alert(decisionMsg);
			this.setState({
				isDecisionTaken: true
			});
		}
	}

	handleCollapsedButtonClick(){
		this.props.onSelect(this.props.idx);
	}

	handleDecisionButtonClick(){
		if (!this.state.isDecisionTaken) {
			this.setState({
				isDecisionOptionsOpen: !this.state.isDecisionOptionsOpen
			})
		}
	}

	handleDecisionOptionClick(action, orderId, orderTimestamp){
		const { onDecisionClick } = this.props;
		onDecisionClick(action, orderId, orderTimestamp);
	}

	render() {
		const {
			data,
			cols,
			idx,
			onSelect,
			isExpanded,
			disableCollapse,
			decisionOptions,
			isDecisionButtonsHidden,
		} = this.props;

		const { isDecisionOptionsOpen, isDecisionTaken } = this.state;
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
				{
					!isDecisionButtonsHidden &&
					<div className="col-sm-5">
						<div
							className={cx("dropdown makeDecisions pull-right", {
								"open": isDecisionOptionsOpen,
								"disable": isDecisionTaken,
							})}
							onClick={this.handleDecisionButtonClick}
							>
							<button className="btn btn-default dropdown-toggle" type="button">
								<span className="value">Make a descison</span>
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu">
								{
									decisionOptions.map((action, index) => {
										return (
											<li key={index}>
												<a onClick={(event) => this.handleDecisionOptionClick(action, data.orderId, data.orderTimestamp, event)}>
													{action.label}
												</a>
											</li>
										);
									})
								}
							</ul>
						</div>
					</div>
				}
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
