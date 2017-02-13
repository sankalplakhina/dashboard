import React from 'react';
import Navbar from 'src/js/components/common/navbar/containers/navbar';
import Footer from 'src/js/components/common/footer/containers/footer';

class AppContainer extends React.Component {

	render() {
		return (
			<div>
				<Navbar />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

AppContainer.propTypes = {
  children: React.PropTypes.any,
};

export default AppContainer;
