import React from 'react';
import Navbar from '~/src/components/common/navbar/components/navbar';
import Footer from '~/src/components/common/footer/components/footer';
import { app } from './styles/appContainer.less';

class AppContainer extends React.Component {

	render() {
		return (
			<div className={app}>
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
