// Root directory(NODE_PATH) for this server is defined in package.json
// "NODE_PATH": "./" from root folder
require('server.babel'); // babel registration (runtime transpilation for node)
const _ = require('lodash');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// authentication related dependencies
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const { apiPort } = require('config/env');

const users = [
  {
	username: "sankalp@gmail.com",
	firstName: "Sankalp",
	lastName: "Lakhina",
	password: "passwordtext",
  },
];

// jwt passport strategy
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'neo-fp-dashboard';

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	const { username } = jwt_payload;
	const user = users[_.findIndex(users, {
		username
	})];
	if (user) {
		next(null, user);
	} else {
		next(null, false);
	}
});

passport.use(strategy);

const app = express();

app.use(morgan('dev', {}));
app.use(compression());
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

app.post('/api/login', function(req, res, next) {

	const { username, password } = req.body;
	const user = users[_.findIndex(users, {
		username
	})];

	if(!user){
		return res.status(401).json({
			data: {
				message:"No such user found!"
			}
		});
	}

	if(user.password === password) {
		// username is the only personalized value that goes into our token
		const payload = {username: user.username};
		const token = jwt.sign(payload, jwtOptions.secretOrKey);
		return res.json({
			data: {
				user,
				token,
			}
		});
	} else {
		return res.status(401).json({
			data: {
				message:"Wrong Password!"
			}
		});
	}
});

app.post('/api/register', function(req, res, next) {

	const { name, email, password, company } = req.body;
	const user = users[_.findIndex(users, {
		username: email
	})];

	if(user){
		return res.status(401).json({
			data: {
				message:"User with this email already exists!"
			}
		});
	}

	const nameArr = name.split(' ');
	const newUser = {
		username: email,
		firstName: nameArr[0],
		lastName: nameArr[1]? nameArr.slice(1).join(' '): null,
		password,
		company
	};
	users.push(newUser);
	// username is the only personalized value that goes into our token
	const payload = {username: newUser.username};
	const token = jwt.sign(payload, jwtOptions.secretOrKey);
	return res.json({
		data: {
			user: newUser,
			token,
		}
	});
});

app.get("/api/logout", passport.authenticate('jwt', { session: false }), function(req, res){
	res.json({
		data: {
			message: "Logged out successfully!"
		}
	});
})

app.get("/api/secret", function(req, res){
	const { username } = req.query;
	const payload = { username };
	const token = jwt.sign(payload, jwtOptions.secretOrKey);
	res.json({
		username,
		token
	});
})

app.get('/api/home', (req, res) => {
	res.json({
		status: '200',
		data: {
			message: 'Home',
		}
	});
});

app.get('/api/explore', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		data: {
			rows: ['quickInfo', 'avgStats'],
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
		}
	});
});

const statsPanelsRows = ['row07SND73H', 'row08SND73H', 'row09SND73H', 'row10SND73H'];

app.get('/api/explore/stats-panels', passport.authenticate('jwt', { session: false }), (req, res) => {
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
});

const reviewTablerows = [
	{ score: {type: 'score', icon: 'score.png', text: '35'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'North India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Approved', safe: true}, },
	{ score: {type: 'score', icon: 'score.png', text: '36'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'South India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
	{ score: {type: 'score', icon: 'score.png', text: '37'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'North India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Approved', safe: true} },
	{ score: {type: 'score', icon: 'score.png', text: '38'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'South India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
	{ score: {type: 'score', icon: 'score.png', text: '39'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'North India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
	{ score: {type: 'score', icon: 'score.png', text: '40'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'South India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
	{ score: {type: 'score', icon: 'score.png', text: '41'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'North India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
	{ score: {type: 'score', icon: 'score.png', text: '42'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'South India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
	{ score: {type: 'score', icon: 'score.png', text: '43'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'North India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
	{ score: {type: 'score', icon: 'score.png', text: '44'}, id: 'gmail/ht.com', timeLeft: '4mins', queue: 'South India', route: 'High Priority', latestPaymentAbuseStatus: {type: 'latestPaymentAbuseStatus', text: 'Declined', risky: true} },
];

app.get('/api/review', passport.authenticate('jwt', { session: false }), (req, res) => {
	const total = reviewTablerows.length;
	let { offset = "0", count = total } = req.query;
	offset = Number(offset);
	count = Number(count);
	const rows = reviewTablerows.slice(offset, (offset + count));
	const next = ((offset + count) != total)? `/api/review?offset=${count}&count=${total - rows.length}` : false;
	const newOffset = Math.abs(count - offset);
	let prev = (offset !== 0 && newOffset !== 0)? `/api/review?offset=${Math.abs(count - offset)}&count=${count}` : false;
	if (newOffset === 0) {
		prev = `/api/review?count=${count}`;
	}
	res.json({
		data: {
			rows: ['reviewTable'],
			reviewTable: {
				type: 'table',
				total,
				count,
				offset,
				rows,
				next,
				prev,
				columns: [
					{ key: 'score', label: 'Score' },
					{ key: 'id', label: 'ID' },
					{ key: 'timeLeft', label: 'Time Left' },
					{ key: 'queue', label: 'Queue' },
					{ key: 'route', label: 'Route' },
					{ key: 'latestPaymentAbuseStatus', label: 'Latest Payment Abuse Status' },
				],
			}
		}
	});
});

app.get('/api/analyze', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		data: {
			rows: ['info', 'biAxialChart','pieGraphs'],
			info: {
				heading: 'Score Threshold Tool',
				paras: [
					'Below is a graph of the number of Create Orders from users labeled "bad" in red and total Create Orders in blue. Click and drag the score bubble to explore your data.',
				],
			},
			biAxialChart: {

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
