import _ from 'lodash';
import proxyFetch from '../core/proxyFetch';
import getOrderData from '../core/getOrderData';

function processResponse(req, res, data) {
	const rowsData = {
		[data.order_id]: getOrderData(data)
	};
	res.json(
		_.defaults({
			rows: [data.order_id],
			panelTitle: {
				cols: ['score', 'order', 'lastPaymentAbuseStatus'],
				score: {
					title : 'SCORE',
				},
				order: {
					title: 'ORDER',
				},
				lastPaymentAbuseStatus: {
					title: 'LAST PAYMENT ABUSE STATUS',
				},
			},
			next: data.next || null,
		}, rowsData)
	);
}

export default (req, res) => proxyFetch(req, res, processResponse);