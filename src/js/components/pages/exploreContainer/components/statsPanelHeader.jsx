import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import DecisionMsgModal from './decisionMsgModal';

class StatsPanelHeader extends React.Component {
	constructor(){
		super();
		this.state = {
			isDecisionOptionsOpen: false,
			isDecisionMsgModalOpen: false,
			modalOptions: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		const {
			isDecisionLoading,
			isDecisionLoaded,
			decisionMsg,
			data: { orderId },
			onDecisionComplete
		} = nextProps;

		const hasDecisionLoaded = !isDecisionLoading && this.props.isDecisionLoading && isDecisionLoaded;
		if (hasDecisionLoaded && decisionMsg) {
			this.handleDecisionMsgModalHide();
			onDecisionComplete(decisionMsg, orderId);
			alert(decisionMsg);
		}
	}

	handleCollapsedButtonClick(){
		this.props.onSelect(this.props.idx);
	}

	handleDecisionButtonClick(){
		if (!this.props.decisionMsg) {
			this.setState({
				isDecisionOptionsOpen: !this.state.isDecisionOptionsOpen
			})
		}
	}

	handleDecisionOptionClick(action, orderId, orderTimestamp){

		const { onDecisionClick } = this.props;

		this.setState({
			isDecisionMsgModalOpen: true,
			modalOptions: {
				action,
				orderId,
				orderTimestamp,
				onDecisionClick,
			}
		});
	}

	handleDecisionMsgModalHide(callback) {
		this.setState({
			isDecisionMsgModalOpen: false,
		}, () => {
			this.setState({
				modalOptions: {},
			});
			callback && callback();
		});
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
			decisionMsg,
		} = this.props;

		const {
			isDecisionOptionsOpen,
			isDecisionMsgModalOpen,
			modalOptions,
		} = this.state;
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
								"disable": decisionMsg,
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
				<DecisionMsgModal
					show={isDecisionMsgModalOpen}
					onHide={this.handleDecisionMsgModalHide}
					options={modalOptions}
					/>
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
