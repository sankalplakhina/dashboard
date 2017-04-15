import { connect } from 'react-redux';
import OrderContent from '../components/orderContent';
import { getOrderData } from '../selectors/orderContainerSelectors';

function mapStateToProps(state) {
  	return {
  		data: getOrderData(state)
  	};
}

export default connect(mapStateToProps)(OrderContent);