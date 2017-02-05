import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

import { apiPort } from '../config/env';

const app = express();

app.use(morgan('dev', {}));
app.use(compression());
app.use(bodyParser.json());

app.get('/api/home', (req, res) => {
	res.json({
		status: '200',
		data: {
			message: 'Home',
		}
	});
});

app.get('/api/explore', (req, res) => {
	res.json({
		data: {
			rows: ['quickInfo', 'avgStats', 'statsPanels'],
			quickInfo: {
				cols: ['newOrders', 'riskyOrders'],
				newOrders: {title: 'New Orders', count: 30},
				riskyOrders: {title: 'Risky Orders', count: 30, risky: true},
			},
			avgStats: {
				cols: ['stats', 'matchedOrders', 'scoreDistribution'],
				stats: {
					title : 'STATS',
					type: 'table',
					rows: [
						{ type: 'tableRow', text: 'Average Score', icon: 'score.png', count:  84},
						{ type: 'tableRow', text: 'Average Order Amount', count:  12421.43},
					]
				},
				matchedOrders: {
					title: 'Matched Orders',
					type: 'table',
					rows: [
						{ type: 'tableRow', text: 'Total', count:  472},
						{ type: 'tableRow', text: 'Bad', count:  '12%', risky: true},
						{ type: 'tableRow', text: 'Not Bad', count:  '92%', safe: true},
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
								{name: 'Safe Orders', value: 475},
								{name: 'Risky Orders', value: 25},
							],
							colors: [
								'#29b6f6',
								'#d0011b',
							],
							centerText: ['25/500', 'Risky Orders']
						},
					]
				}
			},
			statsPanels: {
				rows: ['graphControls', 'panelData'],
				graphControls: {

				},
				panelData: {
					rows: ['row07SND73H', 'row08SND73H'],
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
					row07SND73H: {
						score: {
							icon: 'score.png',
							count:  84,
						},
						order: {
							title: '07SND73H',
							risky: true,
							paras: ['cockatrice8414', 'Dec 3, 2016 1:10 PM (3 days ago)'],
						},
						isExpanded: true,
						_collapsedData: {
							cols: ['left', 'right'],
							left: {
								rows: ['orders', 'payment', 'billingShipping', 'itemOrdered'],
								orders: {
									type: 'table',
									widthSize: 12,
									heading: {
										icon: 'orders.png',
										title: 'Orders'
									},
									tableTitle: {
										cols: ['orderId', 'amount', 'date', 'payment', 'status', 'attempts'],
										orderId: {
											title: 'Order ID'
										},
										amount: {
											title: 'Amount'
										},
										date: {
											title: 'Date'
										},
										payment: {
											title: 'Payment'
										},
										status: {
											title: 'Status'
										},
										attempts: {
											title: 'Attempts'
										}
									},
									rows: [],
								},
								payment: {
									type: 'table',
									widthSize: 12,
									heading: {
										icon: 'payment.png',
										title: 'Payment'
									},
									tableTitle: {
										cols: ['status', 'txnType', 'amount', 'date', 'payment', 'gateway', 'avs-cvv', 'last4'],
										status: {
											title: 'Order ID'
										},
										txnType: {
											title: 'Amount'
										},
										amount: {
											title: 'Date'
										},
										date: {
											title: 'Payment'
										},
										payment: {
											title: 'Status'
										},
										attempts: {
											title: 'Attempts'
										},
										'avs-cvv': {
											title: 'AVS/CVV'
										},
										last4: {
											title: 'Last 4'
										}
									},
									rows: [],
								},
								billingShipping: {
									type: 'map',
									widthSize: 6,
									heading: {
										icon: 'billingShipping.png',
										title: 'Billing and Shipping'
									},
								},
								itemOrdered: {
									type: 'table',
									widthSize: 6,
									heading: {
										icon: 'orders.png',
										title: 'Item Ordered'
									},
									tableTitle: {
										cols: ['item', 'quantity', 'price'],
										item: {
											title: 'Item'
										},
										quantity: {
											title: 'Quantity'
										},
										price: {
											title: 'Price'
										},
									},
									rows: [],
								}
							},
							right: {
								rows: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
								item1: {
									icon: 'statusReliable.png',
									text: 'Account age',
									postText: 'Gurgaon Is Safe Zone : Yes',
								},
								item2: {
									icon: 'statusReliable.png',
									text: 'Account age',
									postText: '1 year : Reliable',
								},
								item3: {
									icon: 'statusTooFast.png',
									text: 'Time to order',
									postText: '5 min : Too fast, abnormal',
								},
								item4: {
									icon: 'statusNone.png',
									text: 'IP Address location',
									postText: 'Delhi : None',
								},
								item5: {
									icon: 'statusReliable.png',
									text: 'Device Cost',
									postText: 'Rs 25K : Healthy',
								},
								item6: {
									icon: 'statusTooFast.png',
									text: 'Email address provider',
									postText: 'gmail/ht.com : Reliable',
								},
							}
						}
					},
					row08SND73H: {
						score: {
							icon: 'score.png',
							count:  85,
						},
						order: {
							title: '08SND73H',
							risky: true,
							paras: ['cockatrice8514', 'Dec 4, 2016 1:10 PM (3 days ago)']
						},
						_collapsedData: {
							cols: ['left', 'right'],
							left: {
								rows: ['orders', 'payment', 'billingShipping', 'itemOrdered'],
								orders: {
									type: 'table',
									widthSize: 12,
									heading: {
										icon: 'orders.png',
										title: 'Orders'
									},
									tableTitle: {
										cols: ['orderId', 'amount', 'date', 'payment', 'status', 'attempts'],
										orderId: {
											title: 'Order ID'
										},
										amount: {
											title: 'Amount'
										},
										date: {
											title: 'Date'
										},
										payment: {
											title: 'Payment'
										},
										status: {
											title: 'Status'
										},
										attempts: {
											title: 'Attempts'
										}
									},
									rows: [],
								},
								payment: {
									type: 'table',
									widthSize: 12,
									heading: {
										icon: 'payment.png',
										title: 'Payment'
									},
									tableTitle: {
										cols: ['status', 'txnType', 'amount', 'date', 'payment', 'gateway', 'avs-cvv', 'last4'],
										status: {
											title: 'Order ID'
										},
										txnType: {
											title: 'Amount'
										},
										amount: {
											title: 'Date'
										},
										date: {
											title: 'Payment'
										},
										payment: {
											title: 'Status'
										},
										attempts: {
											title: 'Attempts'
										},
										'avs-cvv': {
											title: 'AVS/CVV'
										},
										last4: {
											title: 'Last 4'
										}
									},
									rows: [],
								},
								billingShipping: {
									type: 'map',
									widthSize: 6,
									heading: {
										icon: 'billingShipping.png',
										title: 'Billing and Shipping'
									},
								},
								itemOrdered: {
									type: 'table',
									widthSize: 6,
									heading: {
										icon: 'orders.png',
										title: 'Item Ordered'
									},
									tableTitle: {
										cols: ['item', 'quantity', 'price'],
										item: {
											title: 'Item'
										},
										quantity: {
											title: 'Quantity'
										},
										price: {
											title: 'Price'
										},
									},
									rows: [],
								}
							},
							right: {
								rows: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
								item1: {
									icon: 'statusReliable.png',
									text: 'Account age',
									postText: 'Gurgaon Is Safe Zone : Yes',
								},
								item2: {
									icon: 'statusReliable.png',
									text: 'Account age',
									postText: '1 year : Reliable',
								},
								item3: {
									icon: 'statusTooFast.png',
									text: 'Time to order',
									postText: '5 min : Too fast, abnormal',
								},
								item4: {
									icon: 'statusNone.png',
									text: 'IP Address location',
									postText: 'Delhi : None',
								},
								item5: {
									icon: 'statusReliable.png',
									text: 'Device Cost',
									postText: 'Rs 25K : Healthy',
								},
								item6: {
									icon: 'statusTooFast.png',
									text: 'Email address provider',
									postText: 'gmail/ht.com : Reliable',
								},
							}
						}
					}
				}

			}
		}
	});
});

app.get('/api/review', (req, res) => {
	res.json({
		data: {
			message: 'Review API',
		}
	});
});

app.get('/api/analyze', (req, res) => {
	res.json({
		data: {
			rows: ['info', 'pieGraphs'],
			info: {
				heading: 'Score Threshold Tool',
				paras: [
					'Below is a graph of the number of Create Orders from users labeled "bad" in red and total Create Orders in blue. Click and drag the score bubble to explore your data.',
				],
			},
			pieGraphs: {
				cols: [
					{
						type: 'pieChart',
						title: 'Accept',
						data: [
							{name: 'All Orders', value: 29.52},
							{name: 'Accept Orders', value: 70.48},
						],
						colors: [
							'#fde3e6',
							'#ffb1bc',
						],
						centerText: ['70.48%', '(0% of all bad labels)']
					},
					{
						type: 'pieChart',
						title: 'Risky',
						data: [
							{name: 'All Orders', value: 49.36},
							{name: 'Risky Orders', value: 56.64},
						],
						colors: [
							'#fde3e6',
							'#ffb1bc',
						],
						centerText: ['56.64%', '(0% of all bad labels)']
					},
					{
						type: 'pieChart',
						title: 'Reject',
						data: [
							{name: 'All Orders', value: 53.48},
							{name: 'Reject Orders', value: 46.52},
						],
						colors: [
							'#fde3e6',
							'#ffb1bc',
						],
						centerText: ['46.52%', '(0% of all bad labels)']
					},
				]
			}
		}
	});
});

app.get('/api', (req, res) => {
	res.json({message: 'Welcome to the API!'});
});

app.listen(apiPort, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`API is up on port ${apiPort}`);
	}
});
