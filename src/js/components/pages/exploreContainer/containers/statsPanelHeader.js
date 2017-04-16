import { connect } from 'react-redux';
import StatsPanelHeader from '../components/statsPanelHeader';
import {
	getExploreOrdersDecisionOptions,
	getExploreOrderIsDecisionLoading,
	getExploreOrderDecisionMsg,
} from '../selectors/exploreContainerSelectors';
import { setDecision } from '../actions/exploreContainerActions';

function mapStateToProps(state, ownProps) {
	const { data: { orderId } } = ownProps;
  	return {
  		decisionOptions: getExploreOrdersDecisionOptions(state),
  		isDecisionLoading: getExploreOrderIsDecisionLoading(state, orderId),
  		decisionMsg: getExploreOrderDecisionMsg(state, orderId),
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