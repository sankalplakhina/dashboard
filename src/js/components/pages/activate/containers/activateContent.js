import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import OrderContent from '../components/orderContent';
import { getOrderData } from '../selectors/orderContainerSelectors';

function mapStateToProps(state, ownProps) {
	const { params: { orderId } } = ownProps;
  	return {
  		data: getOrderData(state, orderId)
  	};
}

export default withRouter(connect(mapStateToProps)(OrderContent));