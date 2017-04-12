import _ from 'lodash';
import proxyFetch from '../core/proxyFetch';

function processResponse(req, res, data) {
	const rows = _.map(data.values, (value) => {
		return {
			score: value.score,
			id: value.order_id,
			date: value.order_timestamp,
			latestPaymentAbuseStatus: {
				type: 'latestPaymentAbuseStatus',
				text: value.status,
				safe: value.flag === "green",
				risky: value.flag === "red",
			},
		};
	});
	res.json({
		rows: ['reviewTable'],
		reviewTable: {
			type: 'table',
			rows,
			columns: [
				{ key: 'score', label: 'Score' },
				{ key: 'id', label: 'ID' },
				{ key: 'date', label: 'Date' },
				// { key: 'queue', label: 'Queue' },
				// { key: 'route', label: 'Route' },
				{ key: 'latestPaymentAbuseStatus', label: 'Latest Payment Abuse Status' },
			],
		},
		next: data.next || null,
	})
}

export default (req, res) => proxyFetch(req, res, processResponse);