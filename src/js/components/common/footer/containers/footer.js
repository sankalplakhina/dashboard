import { connect } from 'react-redux';
import { isLoginViewSelector } from 'src/components/appContainer/selectors/appContainerSelectors';
import Footer from '../components/footer';

function mapStateToProps(state) {
  	return {
  		hideFooter: isLoginViewSelector(state)
  	};
}

export default connect(mapStateToProps)(Footer);