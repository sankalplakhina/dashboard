import _ from 'lodash';
import proxyFetch from '../core/proxyFetch';

function processResponse(req, res, data) {
	const badPercent = (data.risky_orders / data.total).toFixed(2) * 100;
	res.json({
		rows: ['quickInfo', 'avgStats'],
		quickInfo: {
			cols: ['allOrders', 'riskyOrders'],
			allOrders: {title: 'All Orders', count: data.total},
			riskyOrders: {title: 'Risky Orders', count: data.risky_orders, risky: true},
		},
		avgStats: {
			cols: ['stats', 'matchedOrders', 'scoreDistribution'],
			stats: {
				title : 'STATS',
				type: 'table',
				rows: [
					{ type: 'tableRow', text: 'Average Score', icon: 'score.png', count:  data.average_score},
					{ type: 'tableRow', text: 'Average Order Amount', count:  data.average_amount},
				]
			},
			matchedOrders: {
				title: 'Matched Orders',
				type: 'table',
				rows: [
					{ type: 'tableRow', text: 'Total', count:  data.total},
					{ type: 'tableRow', text: 'Bad', count:  `${badPercent}%`, risky: true},
					{ type: 'tableRow', text: 'Not Bad', count:  `${100 - badPercent}%`, safe: true},
					{ type: 'tableRow', text: 'Unlabled', count:  '0%', safe: true},
				]
			},
			scoreDistribution: {
				title: 'Score distribution',
				type: 'chart',
				rows: [
					{
						type: 'pieChart',
						data: [
							{name: 'Safe Orders', value: data.total},
							{name: 'Risky Orders', value: data.risky_orders},
						],
						colors: [
							'#29b6f6',
							'#d0011b',
						],
						centerText: [`${data.risky_orders}/${data.total}`, 'Risky Orders']
					},
				]
			}
		},
	})
}

export default (req, res) => proxyFetch(req, res, processResponse);