import { connect } from 'react-redux';
import { isLoginViewSelector } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import Navbar from '../components/navbar';

function mapStateToProps(state) {
  	return {
  		addFakeNavSpace: !isLoginViewSelector(state)
  	};
}

export default connect(mapStateToProps)(Navbar);