import _ from 'lodash';

function getOrderData(value) {
	return {
		score: getScore(value),
		order: getOrder(value),
		_collapsedData: getCollapsedData(value),
	};
}

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

function getCollapsedData(value) {
	const left = getCollapsedDataLeftData(value);
	const right = getCollapsedDataRightData(value);
	return {
		cols: ["left", "right"],
		left,
		right
	};
}

function getCollapsedDataLeftData(value){
	const rows = ['orders', 'payment', 'billingShipping', 'itemOrdered'];
	const rowsData = {
		orders: getCollapsedDataLeftRowOrdersData(value),
		payment: getCollapsedDataLeftRowPaymentData(value),
		billingShipping: getCollapsedDataLeftRowBillingShippingData(value),
		itemOrdered: getCollapsedDataLeftRowItemOrderedData(value),
	};
	return _.defaults({
		rows,
		widthSize: 8,
	}, rowsData);
}

function getCollapsedDataLeftRowOrdersData(value){
	const rows = [];
	rows.push({
		orderId: value.transaction.id,
		amount: `${value.transaction.currency_code} ${value.transaction.amount}`,
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

function getCollapsedDataLeftRowBillingShippingData(value){
	return {
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
			heading: value.billing_address.name,
			address: getAddressText(value.billing_address),
			lat: -25.363,
			lang: 131.044,
		},
		shipping: {
			icon: 'shipping.png',
			heading: value.shipping_address.name,
			address: getAddressText(value.shipping_address),
			lat: -20.363,
			lang: 131.044,
		}
	};
}

function getCollapsedDataLeftRowItemOrderedData(value){
	const rows = _.map(value.items, (item) => {
		return {
			item: item.product_title,
			quantity: item.quantity,
			price: item.price,
		};
	});
	return {
		type: 'table',
		widthSize: 6,
		heading: {
			class: 'itemOrdered',
			icon: 'orders.png',
			title: 'Item Ordered'
		},
		rows,
		columns: [
			{ key: 'item', label: 'Item' },
			{ key: 'quantity', label: 'Quantity' },
			{ key: 'price', label: 'Price' },
		],
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

function getAddressText(address){
	return `${address.address1}, ${address.address2}, ${address.city}, ${address.region} - ${address.zipcode}`;
}

function getCollapsedDataRightData(value){
	const rowsData = {};
	const rows = _.map(value.reasons, (reason) => {
		const itemID = reason.name;
		rowsData[itemID] = {
			type: 'notification',
			icon: getReasonStatusIconByType(reason.flag),
			text: reason.display_name,
			postText: reason.value,
		};
		return itemID;
	})
	return _.defaults({
		rows,
		widthSize: 4,
	}, rowsData);
}

function getReasonStatusIconByType(flag) {
	switch(flag){
		case 'red':
		return 'statusTooFast.png';

		case 'green':
		return 'statusReliable.png';

		case 'grey':
		return 'statusNone.png';

		default:
		return '';
	}
}

export default getOrderData;