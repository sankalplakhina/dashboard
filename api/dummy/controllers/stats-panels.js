const statsPanelsRows = ['row07SND73H', 'row08SND73H', 'row09SND73H', 'row10SND73H'];

const statsPanels = (req, res) => {
	const total = statsPanelsRows.length;
	let { offset = "0", count = total } = req.query;
	offset = Number(offset);
	count = Number(count);
	const rows = statsPanelsRows.slice(offset, (offset + count));
	const next = ((offset + count) != total)? `/api/explore/stats-panels?offset=${count}&count=${total - rows.length}` : false;
	const newOffset = Math.abs(count - offset);
	let prev = (offset !== 0 && newOffset !== 0)? `/api/explore/stats-panels?offset=${Math.abs(count - offset)}&count=${count}` : false;
	if (newOffset === 0) {
		prev = `/api/explore/stats-panels?count=${count}`;
	}
	res.json({
		data: {
			total,
			offset,
			count,
			rows,
			next,
			prev,
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
				_collapsedData: {
					cols: ['left', 'right'],
					left: {
						rows: ['orders', 'payment', 'billingShipping', 'itemOrdered'],
						widthSize: 8,
						orders: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'order',
								icon: 'orders.png',
								title: 'Orders'
							},
							columns: [
								{ key: 'orderId', label: 'Order ID' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'status', label: 'Status' },
								{ key: 'attempts', label: 'Attempts' },
							],
							rows: [
								{ orderId: '7834h48', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', status: 'Success', attempts: '3' },
								{ orderId: '7834h48', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Debit Card', status: 'Success', attempts: '3' },
							],
						},
						payment: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'payment',
								icon: 'payment.png',
								title: 'Payment'
							},
							columns: [
								{ key: 'status', label: 'Status' },
								{ key: 'txnType', label: 'TXN Type' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'gateway', label: 'Gateway' },
								{ key: 'avsCvv', label: 'AVS/CVV' },
								{ key: 'last4', label: 'Last 4' },
							],
							rows: [
								{ status: 'Success', txnType: 'Sale', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', gateway: 'Stripe', avsCvv: {type: 'avsCvv', items: [{text: 'AVS Y', safe: true}, {text: 'CVV N', risky: true}]}, last4: 'Last 4' },
							],
						},
						billingShipping: {
							type: 'map',
							widthSize: 6,
							heading: {
								class: 'billShopping',
								icon: 'billingShipping.png',
								title: 'Billing and Shipping'
							},
							markers: ['billing', 'shipping'],
							billing:{
								icon: 'billing.png',
								heading: 'John',
								address: '403, Nirvana courtyard, Sector-48, Gurgaon, haryana- 122001',
								lat: -25.363,
								lang: 131.044,
							},
							shipping: {
								icon: 'shipping.png',
								heading: 'John',
								address: ' 110, Nirvana Escape, Sector-48, Gurgaon, haryana- 122001',
								lat: -20.363,
								lang: 131.044,
							}
						},
						itemOrdered: {
							type: 'table',
							widthSize: 6,
							heading: {
								class: 'itemOrdered',
								icon: 'orders.png',
								title: 'Item Ordered'
							},
							columns: [
								{ key: 'item', label: 'Item' },
								{ key: 'quantity', label: 'Quantity' },
								{ key: 'price', label: 'Price' },
							],
							rows: [
								{ item: 'Iphone 6', quantity: '33', price: '$1043'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'MI5', quantity: '45', price: '$698'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
							],
						}
					},
					right: {
						widthSize: 4,
						rows: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
						item1: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: 'Gurgaon Is Safe Zone : Yes',
						},
						item2: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: '1 year : Reliable',
						},
						item3: {
							type: 'notification',
							icon: 'statusTooFast.png',
							text: 'Time to order',
							postText: '5 min : Too fast, abnormal',
						},
						item4: {
							type: 'notification',
							icon: 'statusNone.png',
							text: 'IP Address location',
							postText: 'Delhi : None',
						},
						item5: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Device Cost',
							postText: 'Rs 25K : Healthy',
						},
						item6: {
							type: 'notification',
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
						widthSize: 8,
						orders: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'order',
								icon: 'orders.png',
								title: 'Orders'
							},
							columns: [
								{ key: 'orderId', label: 'Order ID' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'status', label: 'Status' },
								{ key: 'attempts', label: 'Attempts' },
							],
							rows: [
								{ orderId: '7834h48', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', status: 'Success', attempts: '3' }
							],
						},
						payment: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'payment',
								icon: 'payment.png',
								title: 'Payment'
							},
							columns: [
								{ key: 'status', label: 'Status' },
								{ key: 'txnType', label: 'TXN Type' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'gateway', label: 'Gateway' },
								{ key: 'avsCvv', label: 'AVS/CVV' },
								{ key: 'last4', label: 'Last 4' },
							],
							rows: [
								{ status: 'Success', txnType: 'Sale', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', gateway: 'Stripe', avsCvv: 'TODO', last4: 'Last 4' },
							],
						},
						billingShipping: {
							type: 'map',
							widthSize: 6,
							heading: {
								class: 'billShopping',
								icon: 'billingShipping.png',
								title: 'Billing and Shipping'
							},
							markers: ['billing', 'shipping'],
							billing:{
								icon: 'billing.png',
								heading: 'John',
								address: '403, Nirvana courtyard, Sector-48, Gurgaon, haryana- 122001',
								lat: -25.363,
								lang: 131.044,
							},
							shipping: {
								icon: 'shipping.png',
								heading: 'John',
								address: ' 110, Nirvana Escape, Sector-48, Gurgaon, haryana- 122001',
								lat: -20.363,
								lang: 131.044,
							}
						},
						itemOrdered: {
							type: 'table',
							widthSize: 6,
							heading: {
								class: 'itemOrdered',
								icon: 'orders.png',
								title: 'Item Ordered'
							},
							columns: [
								{ key: 'item', label: 'Item' },
								{ key: 'quantity', label: 'Quantity' },
								{ key: 'price', label: 'Price' },
							],
							rows: [
								{ item: 'Iphone 6', quantity: '33', price: '$1043'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'MI5', quantity: '45', price: '$698'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
							],
						}
					},
					right: {
						widthSize: 4,
						rows: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
						item1: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: 'Gurgaon Is Safe Zone : Yes',
						},
						item2: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: '1 year : Reliable',
						},
						item3: {
							type: 'notification',
							icon: 'statusTooFast.png',
							text: 'Time to order',
							postText: '5 min : Too fast, abnormal',
						},
						item4: {
							type: 'notification',
							icon: 'statusNone.png',
							text: 'IP Address location',
							postText: 'Delhi : None',
						},
						item5: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Device Cost',
							postText: 'Rs 25K : Healthy',
						},
						item6: {
							type: 'notification',
							icon: 'statusTooFast.png',
							text: 'Email address provider',
							postText: 'gmail/ht.com : Reliable',
						},
					}
				}
			},
			row09SND73H: {
				score: {
					icon: 'score.png',
					count:  86,
				},
				order: {
					title: '09SND73H',
					risky: true,
					paras: ['cockatrice8414', 'Dec 3, 2016 1:10 PM (3 days ago)'],
				},
				isExpanded: true,
				_collapsedData: {
					cols: ['left', 'right'],
					left: {
						rows: ['orders', 'payment', 'billingShipping', 'itemOrdered'],
						widthSize: 8,
						orders: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'order',
								icon: 'orders.png',
								title: 'Orders'
							},
							columns: [
								{ key: 'orderId', label: 'Order ID' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'status', label: 'Status' },
								{ key: 'attempts', label: 'Attempts' },
							],
							rows: [
								{ orderId: '7834h48', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', status: 'Success', attempts: '3' },
								{ orderId: '7834h48', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Debit Card', status: 'Success', attempts: '3' },
							],
						},
						payment: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'payment',
								icon: 'payment.png',
								title: 'Payment'
							},
							columns: [
								{ key: 'status', label: 'Status' },
								{ key: 'txnType', label: 'TXN Type' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'gateway', label: 'Gateway' },
								{ key: 'avsCvv', label: 'AVS/CVV' },
								{ key: 'last4', label: 'Last 4' },
							],
							rows: [
								{ status: 'Success', txnType: 'Sale', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', gateway: 'Stripe', avsCvv: {type: 'avsCvv', items: [{text: 'AVS Y', safe: true}, {text: 'CVV N', risky: true}]}, last4: 'Last 4' },
							],
						},
						billingShipping: {
							type: 'map',
							widthSize: 6,
							heading: {
								class: 'billShopping',
								icon: 'billingShipping.png',
								title: 'Billing and Shipping'
							},
							markers: ['billing', 'shipping'],
							billing:{
								icon: 'billing.png',
								heading: 'John',
								address: '403, Nirvana courtyard, Sector-48, Gurgaon, haryana- 122001',
								lat: -25.363,
								lang: 131.044,
							},
							shipping: {
								icon: 'shipping.png',
								heading: 'John',
								address: ' 110, Nirvana Escape, Sector-48, Gurgaon, haryana- 122001',
								lat: -20.363,
								lang: 131.044,
							}
						},
						itemOrdered: {
							type: 'table',
							widthSize: 6,
							heading: {
								class: 'itemOrdered',
								icon: 'orders.png',
								title: 'Item Ordered'
							},
							columns: [
								{ key: 'item', label: 'Item' },
								{ key: 'quantity', label: 'Quantity' },
								{ key: 'price', label: 'Price' },
							],
							rows: [
								{ item: 'Iphone 6', quantity: '33', price: '$1043'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'MI5', quantity: '45', price: '$698'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
							],
						}
					},
					right: {
						widthSize: 4,
						rows: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
						item1: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: 'Gurgaon Is Safe Zone : Yes',
						},
						item2: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: '1 year : Reliable',
						},
						item3: {
							type: 'notification',
							icon: 'statusTooFast.png',
							text: 'Time to order',
							postText: '5 min : Too fast, abnormal',
						},
						item4: {
							type: 'notification',
							icon: 'statusNone.png',
							text: 'IP Address location',
							postText: 'Delhi : None',
						},
						item5: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Device Cost',
							postText: 'Rs 25K : Healthy',
						},
						item6: {
							type: 'notification',
							icon: 'statusTooFast.png',
							text: 'Email address provider',
							postText: 'gmail/ht.com : Reliable',
						},
					}
				}
			},
			row10SND73H: {
				score: {
					icon: 'score.png',
					count:  87,
				},
				order: {
					title: '10SND73H',
					risky: true,
					paras: ['cockatrice8414', 'Dec 3, 2016 1:10 PM (3 days ago)'],
				},
				isExpanded: true,
				_collapsedData: {
					cols: ['left', 'right'],
					left: {
						rows: ['orders', 'payment', 'billingShipping', 'itemOrdered'],
						widthSize: 8,
						orders: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'order',
								icon: 'orders.png',
								title: 'Orders'
							},
							columns: [
								{ key: 'orderId', label: 'Order ID' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'status', label: 'Status' },
								{ key: 'attempts', label: 'Attempts' },
							],
							rows: [
								{ orderId: '7834h48', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', status: 'Success', attempts: '3' },
								{ orderId: '7834h48', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Debit Card', status: 'Success', attempts: '3' },
							],
						},
						payment: {
							type: 'table',
							widthSize: 12,
							heading: {
								class: 'payment',
								icon: 'payment.png',
								title: 'Payment'
							},
							columns: [
								{ key: 'status', label: 'Status' },
								{ key: 'txnType', label: 'TXN Type' },
								{ key: 'amount', label: 'Amount' },
								{ key: 'date', label: 'Date' },
								{ key: 'payment', label: 'Payment' },
								{ key: 'gateway', label: 'Gateway' },
								{ key: 'avsCvv', label: 'AVS/CVV' },
								{ key: 'last4', label: 'Last 4' },
							],
							rows: [
								{ status: 'Success', txnType: 'Sale', amount: '$843', date: 'Dec8, 2016 21:35', payment: 'Credit Card', gateway: 'Stripe', avsCvv: {type: 'avsCvv', items: [{text: 'AVS Y', safe: true}, {text: 'CVV N', risky: true}]}, last4: 'Last 4' },
							],
						},
						billingShipping: {
							type: 'map',
							widthSize: 6,
							heading: {
								class: 'billShopping',
								icon: 'billingShipping.png',
								title: 'Billing and Shipping'
							},
							markers: ['billing', 'shipping'],
							billing:{
								icon: 'billing.png',
								heading: 'John',
								address: '403, Nirvana courtyard, Sector-48, Gurgaon, haryana- 122001',
								lat: -25.363,
								lang: 131.044,
							},
							shipping: {
								icon: 'shipping.png',
								heading: 'John',
								address: ' 110, Nirvana Escape, Sector-48, Gurgaon, haryana- 122001',
								lat: -20.363,
								lang: 131.044,
							}
						},
						itemOrdered: {
							type: 'table',
							widthSize: 6,
							heading: {
								class: 'itemOrdered',
								icon: 'orders.png',
								title: 'Item Ordered'
							},
							columns: [
								{ key: 'item', label: 'Item' },
								{ key: 'quantity', label: 'Quantity' },
								{ key: 'price', label: 'Price' },
							],
							rows: [
								{ item: 'Iphone 6', quantity: '33', price: '$1043'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'Iphone 6s', quantity: '13', price: '$1243'},
								{ item: 'MI5', quantity: '45', price: '$698'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
								{ item: 'One Plus 3', quantity: '8', price: '$843'},
							],
						}
					},
					right: {
						widthSize: 4,
						rows: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
						item1: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: 'Gurgaon Is Safe Zone : Yes',
						},
						item2: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Account age',
							postText: '1 year : Reliable',
						},
						item3: {
							type: 'notification',
							icon: 'statusTooFast.png',
							text: 'Time to order',
							postText: '5 min : Too fast, abnormal',
						},
						item4: {
							type: 'notification',
							icon: 'statusNone.png',
							text: 'IP Address location',
							postText: 'Delhi : None',
						},
						item5: {
							type: 'notification',
							icon: 'statusReliable.png',
							text: 'Device Cost',
							postText: 'Rs 25K : Healthy',
						},
						item6: {
							type: 'notification',
							icon: 'statusTooFast.png',
							text: 'Email address provider',
							postText: 'gmail/ht.com : Reliable',
						},
					}
				}
			},
		}
	});
}

export default statsPanels;