import { connect } from 'react-redux';
import StatsPanelHeader from '../components/statsPanelHeader';
import {
    getExploreOrdersDecisionOptions,
	getExploreOrderIsDecisionLoading,
	getExploreOrderDecisionMsg,
    getExploreOrderIsDecisionLoaded,
} from '../selectors/exploreContainerSelectors';
import { setDecision, removeDecisionCompleteOrder } from '../actions/exploreContainerActions';
import { showGlobalAlert } from 'src/js/components/globalAlert/actions';

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
  		},
        onDecisionComplete(decisionMsg, orderId) {
            dispatch(showGlobalAlert(decisionMsg, removeDecisionCompleteOrder(orderId)));
        }
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPanelHeader);