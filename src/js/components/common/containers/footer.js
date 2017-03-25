import { connect } from 'react-redux';
import { isAuthViewSelector } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import Footer from '../components/footer';

function mapStateToProps(state) {
  	return {
  		hideFooter: isAuthViewSelector(state)
  	};
}

export default connect(mapStateToProps)(Footer);