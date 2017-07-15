import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class GlobalAlert extends React.Component {
	constructor() {
		super();
	}

	render () {
		const { isActive, alertText, onHide } = this.props;
		return (
			<Modal
				dialogClassName="descisonMsg"
				show={isActive}
				onHide={onHide}
				backdrop={false}
				>

				<Modal.Header closeButton>
					<Modal.Title>Thirdwatch says: </Modal.Title>
				</Modal.Header>

				<Modal.Body>
                    {alertText}
	          	</Modal.Body>

	          	<Modal.Footer>
		            <Button onClick={onHide}>Okay</Button>
		        </Modal.Footer>
	        </Modal>
		);
	}
}

export default bindHandlers(GlobalAlert);
