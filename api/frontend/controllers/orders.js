import _ from 'lodash';
import { twHost, twPort } from 'config/env';
import fetch from 'isomorphic-fetch';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return 'http://' + twHost + ':' + twPort + adjustedPath;
}

const baseFetchOptions = {
	headers: {
		Accept: 'application/json',
	},
	method: 'GET',
};

// data slice functions
function getScore(value) {
	return {
		icon: "score.png",
		count: value.score,
	};
}

function getOrder(value) {
	const paras = [];
	paras.push(value.user_id);
	paras.push(value.order_timestamp);
	return {
		risky: (value.flag === "red"),
		title: value.order_id,
		paras,
	};
}

function getPaymentTypeText(paymentType) {
	switch(paymentType) {
		case '_creditCard':
		return "Credit Card";

		default:
		return ""
	}
}

function getStatusTypeText(statusType) {
	switch(statusType) {
		case '_success':
		return "Success";

		default:
		return ""
	}
}

function getTransactionTypeText(transType) {
	switch(transType) {
		case '_sale':
		return "Sale";

		default:
		return ""
	}
}

function getPaymentGatewayText(paymentGateway) {
	switch(paymentGateway) {
		case 'payU':
		return "PayU";

		default:
		return ""
	}
}

function getCollapsedDataLeftRowOrdersData(value){
	const rows = [];
	rows.push({
		orderId: value.transaction.id,
		amount: `${value.transaction.currency_code} ${value.transaction.order_amount}`,
		date: value.transaction.timestamp,
		payment: getPaymentTypeText(value.payment_method.payment_type),
		status: getStatusTypeText(value.transaction.status),
	});
	return {
		type: 'table',
		widthSize: 12,
		heading: {
			class: 'order',
			icon: 'orders.png',
			title: 'Orders'
		},
		rows,
		columns: [
			{ key: 'orderId', label: 'Order ID' },
			{ key: 'amount', label: 'Amount' },
			{ key: 'date', label: 'Date' },
			{ key: 'payment', label: 'Payment' },
			{ key: 'status', label: 'Status' },
			// { key: 'attempts', label: 'Attempts' }, // TODO: Ask about it's key
		],
	}
}

function getCollapsedDataLeftRowPaymentData(value){
	const rows = [
		{
			status: getStatusTypeText(value.transaction.status),
			txnType: getTransactionTypeText(value.transaction.trans_type),
			amount: `${value.payment_method.currency_code} ${value.payment_method.amount}`,
			date: value.transaction.timestamp,
			payment: getPaymentTypeText(value.payment_method.payment_type),
			gateway: getPaymentGatewayText(value.payment_method.payment_gateway),
			avsCvv: {
				type: 'avsCvv',
				items: [
					{text: `AVS ${value.payment_method.avs_response_code}`, safe: true},
					{text: `CVV ${value.payment_method.cvv_response_code}`, risky: true}
				]
			},
			last4: value.payment_method.card_last4,
		},
	];

	return {
		type: 'table',
		widthSize: 12,
		heading: {
			class: 'payment',
			icon: 'payment.png',
			title: 'Payment'
		},
		rows,
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
	}
}


function getCollapsedDataLeftData(value){
	const rows = ['orders', 'payment', 'billingShipping', 'itemOrdered'];
	const rowData = {
		orders: getCollapsedDataLeftRowOrdersData(value),
		payment: getCollapsedDataLeftRowPaymentData(value),
		billingShipping: {},
		itemOrdered: {},
	};
	return _.defaults({
		rows,
		widthSize: 8,
	}, rowData);
}

function getCollapsedDataRightData(value){
	return {
		rows: [],
		widthSize: 4,
	};
}

function getCollapsedData(value) {
	const left = getCollapsedDataLeftData(value);
	const right = getCollapsedDataRightData(value);
	return {
		cols: ["left", "right"],
		left,
		right
	};
}

function getRowData(value) {
	return {
		score: getScore(value),
		order: getOrder(value),
		_collapsedData: getCollapsedData(value),
	};
}

function processResponse(req, res, data) {
	// set schema
	const processedData = {
		rows: [],
		panelTitle: {
			cols: [],
		},
		next: data.next
	};
	// create rows and data
	_.each(data.values, function(value){
		processedData.rows.push(value.order_id);
		processedData[value.order_id] = getRowData(value);
	})
	// create next
	res.json(processedData);
}

const orders = (req, res) => {
	return fetch(formatUrl('/twapi/orders'), _.defaultsDeep({}, baseFetchOptions))
	      .then(response => response.json())
	      .then(data => processResponse(req, res, data))
}

export default orders;