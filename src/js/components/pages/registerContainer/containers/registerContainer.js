import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { isAuthDataLoaded } from 'src/js/components/pages/loginContainer/selectors/loginContainerSelectors';
import { register } from 'src/js/components/pages/loginContainer/actions/loginContainerActions';
import RegisterContainer from '../components/registerContainer';

function mapStateToProps(state) {
  	return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onRegisterSubmit({ name, email, password, company }) {
  			dispatch(register({ name, email, password, company }, ownProps.router))
  		},
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));