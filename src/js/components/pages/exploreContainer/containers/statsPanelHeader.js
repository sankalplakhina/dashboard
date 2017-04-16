import { connect } from 'react-redux';
import StatsPanelHeader from '../components/statsPanelHeader';
import { getStatsPanelDecisionOptions } from '../selectors/exploreContainerSelectors';
import { setDecision } from '../actions/exploreContainerActions';

function mapStateToProps(state) {
  	return {
  		decisionOptions: getStatsPanelDecisionOptions(state),
  	};
}

function mapDispatchToProps(dispatch) {
  	return {
  		onDecisionClick(action, orderId, orderTimestamp){
  			dispatch(setDecision(action, orderId, orderTimestamp));
  		}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPanelHeader);