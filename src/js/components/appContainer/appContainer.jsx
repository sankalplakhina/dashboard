import React from 'react';
import Navbar from 'src/js/components/common/containers/navbar';
import Footer from 'src/js/components/common/containers/footer';
import GlobalAlert from 'src/js/components/globalAlert/containers/globalAlert';

class AppContainer extends React.Component {

	render() {
		const isNotFoundComponent = (React.Children.only(this.props.children).type.name === 'NotFound');
		return (
			<div>
				<Navbar isNotFoundComponent={isNotFoundComponent} />
				{this.props.children}
				<GlobalAlert />
				<Footer isNotFoundComponent={isNotFoundComponent} />
			</div>
		);
	}
}

AppContainer.propTypes = {
  children: React.PropTypes.any,
};

export default AppContainer;
