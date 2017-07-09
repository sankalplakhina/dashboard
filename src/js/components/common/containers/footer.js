import _ from 'lodash';
import { connect } from 'react-redux';
import { isAuthViewSelector, getIsActivateView } from 'src/js/components/appContainer/selectors/appContainerSelectors';
import Footer from '../components/footer';

function mapStateToProps(state) {
  	return {
  		hideFooter: isAuthViewSelector(state) || getIsActivateView(state)
  	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { isNotFoundComponent } = ownProps;
	const mergeProps = {};
	if (isNotFoundComponent) {
		mergeProps.hideFooter = true;
	}
  	return _.defaults(mergeProps, stateProps, dispatchProps, ownProps);
}

export default connect(mapStateToProps, null, mergeProps)(Footer);