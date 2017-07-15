import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class DecisionMsgModal extends React.Component {
	constructor() {
		super();
		this.state = this.getInitState();
	}

	componentWillReceiveProps({ options }) {
		if (options !== this.props.options) {
			this.handleResetText();
		}
	}

	handleResetText() {
		this.setState(this.getInitState());
	}

	getInitState() {
		return {
			decisionMsgText: '',
			isDecisionInProgress: false,
		};
	}

	handleDecisionClick() {
		this.setState({
			isDecisionInProgress: true
		});
		const {
			options: {
				action,
				orderId,
				orderTimestamp,
				onDecisionClick,
			}
		} = this.props;
		const { decisionMsgText } = this.state;
		onDecisionClick(action, orderId, orderTimestamp, decisionMsgText);
	}

	handleTextChange(event) {
		this.setState({
			decisionMsgText: event.target.value,
		});
	}

	handleHide() {
		this.props.onHide(this.handleResetText);
	}

	render () {
		const { show, onHide, options : { action = {} } } = this.props;
		const { decisionMsgText, isDecisionInProgress } = this.state;
		return (
			<Modal
				dialogClassName="descisonMsg"
				show={show}
				onHide={this.handleHide}
				backdrop={false}
				>

				<Modal.Header closeButton onHide={this.handleHide}>
					<Modal.Title>Make a descison</Modal.Title>
				</Modal.Header>

				<Modal.Body>
                    <textarea
                    	placeholder="Enter your message"
                    	value={decisionMsgText}
                    	onChange={this.handleTextChange} />
	          	</Modal.Body>

	          	<Modal.Footer>
		            <Button onClick={this.handleHide}>Cancel</Button>
		            <Button
		            	bsStyle="primary"
		            	disabled={isDecisionInProgress}
		            	onClick={this.handleDecisionClick}
		            	>{action.label}
		            </Button>
		        </Modal.Footer>
	        </Modal>
		);
	}
}

export default bindHandlers(DecisionMsgModal);
