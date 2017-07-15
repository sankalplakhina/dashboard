import React from 'react';
import LoggedOutNavbar from 'src/js/components/common/components/loggedOutNavbar';
import LoggedOutFooter from 'src/js/components/common/components/loggedOutFooter';
import GlobalAlert from 'src/js/components/globalAlert/containers/globalAlert';

class LoggedOutAppContainer extends React.Component {

	render() {
		const isNotFoundComponent = (React.Children.only(this.props.children).type.name === 'NotFound');
		return (
			<div className="login">
				<LoggedOutNavbar />
				{this.props.children}
				<GlobalAlert />
				<LoggedOutFooter />
			</div>
		);
	}
}

LoggedOutAppContainer.propTypes = {
  children: React.PropTypes.any,
};

export default LoggedOutAppContainer;
