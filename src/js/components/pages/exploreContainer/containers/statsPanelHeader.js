import { connect } from 'react-redux';
import StatsPanelHeader from '../components/statsPanelHeader';
import {
	getExploreOrdersDecisionOptions,
	getExploreOrderIsDecisionLoading,
	getExploreOrderDecisionMsg,
  getExploreOrderIsDecisionLoaded,
} from '../selectors/exploreContainerSelectors';
import { setDecision } from '../actions/exploreContainerActions';

function mapStateToProps(state, ownProps) {
	const { data: { orderId } } = ownProps;
  	return {
  		decisionOptions: getExploreOrdersDecisionOptions(state),
      isDecisionLoading: getExploreOrderIsDecisionLoading(state, orderId),
  		isDecisionLoaded: getExploreOrderIsDecisionLoaded(state, orderId),
  		decisionMsg: getExploreOrderDecisionMsg(state, orderId),
  	};
}

function mapDispatchToProps(dispatch) {
  	return {
  		onDecisionClick(action, orderId, orderTimestamp, decisionMsgText){
  			dispatch(setDecision(action, orderId, orderTimestamp, decisionMsgText));
  		}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPanelHeader);