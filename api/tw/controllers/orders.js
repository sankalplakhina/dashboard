const orders = (req, res) => {
	res.json({
		"values": [{
			"user_id": "sagar_348",
			"order_id": "OCT45679",
			"score": 82,
			"flag": "red",
			"order_timestamp": "1970-01-18T03:00:49.970Z",
			"order_amount": "2500",
			"order_currency_code": "INR",
			"items": [{
				"item_id": "UI4567",
				"product_title": "PUMA Men's Running Shoes",
				"price": "1500",
				"currency_code": "INR",
				"upc": "09868676878878",
				"sku": "67688789",
				"isbn": null,
				"brand": "PUMA",
				"manufacturer": "PUMA INDIA",
				"category": "man > shoes",
				"tags": "man, sports, shoes",
				"color": "black",
				"quantity": "1",
				"is_on_sale": true,
				"max_quantity": "5",
				"discount_price": "2500",
				"product_weight": "0.5",
				"country": "IN",
				"description_short": "Black running shoes for man",
				"description": "Puma light weight shoes for long running",
				"seller_id": "puma23456",
				"seller_name": "PUMA INDIA"
			}, {
				"item_id": "AU67",
				"product_title": "Adidas T-shirt",
				"price": "2000",
				"currency_code": "INR",
				"upc": "098697676878878",
				"sku": "45688789",
				"isbn": null,
				"brand": "ADIDAS",
				"manufacturer": "ADIDAS",
				"category": "man > tshirt",
				"tags": "man, sports, tshirt",
				"color": "orange",
				"quantity": "1",
				"is_on_sale": false,
				"max_quantity": "0",
				"discount_price": null,
				"product_weight": "0.2",
				"country": "IN",
				"description_short": "Orange tshirt for man",
				"description": "Nice looking Orange adidas casual tshirt",
				"seller_id": "adi23456",
				"seller_name": "ADIDAS"
			}],
			"billing_address": {
				"name": "Sagar Sharma",
				"phone": "+919568987654",
				"address1": "C802, Nirvana Courtyard",
				"address2": "Nirvana Country, Sector 50",
				"city": "Gurgaon",
				"region": "Haryana",
				"country": "IN",
				"zipcode": "122002",
				"is_office_address": false,
				"is_home_address": true
			},
			"shipping_address": {
				"name": "Ajay Sharma",
				"phone": "+919545987654",
				"address1": "C115 Business park ",
				"address2": "Nirvana Country, Sector 50",
				"city": "Gurgaon",
				"region": "Haryana",
				"country": "IN",
				"zipcode": "122001",
				"is_office_address": false,
				"is_home_address": true
			},
			"transaction": {
				"id": "77788877762",
				"timestamp": "1970-01-18T03:00:49.970Z",
				"amount": "5000",
				"currency_code": "INR",
				"trans_type": "_sale",
				"status": "_success",
				"is_first_time_buyer": true
			},
			"payment_method": {
				"payment_type": "_creditCard",
				"payment_gateway": "payU",
				"account_name": "Sagar Sharma",
				"card_bin": "460345",
				"avs_response_code": "M",
				"cvv_response_code": "Y",
				"card_last4": "3456",
				"card_expiry_month": "05",
				"card_expiry_year": "2021",
				"amount": "3500",
				"currency_code": "INR"
			},
			"reasons": [{
				"name": "_numOfFailedTransactions",
				"display_name": "Number of failed transactions",
				"flag": "green",
				"value": "0",
				"is_display": true
			}, {
				"name": "_accountAge",
				"display_name": "Account age",
				"flag": "red",
				"value": "0",
				"is_display": true
			}, {
				"name": "_numAccountsWithSameIp",
				"display_name": "Number of accounts from same IP",
				"flag": "green",
				"value": "0",
				"is_display": true
			}, {
				"name": "_numOfOrderSameIp",
				"display_name": "Number of orders from same IP",
				"flag": "red",
				"value": "11",
				"is_display": true
			}, {
				"name": "_ipLocation",
				"display_name": "IP Address location",
				"flag": "grey",
				"value": "New Delhi",
				"is_display": true
			}, {
				"name": "_sameBillShippAddress",
				"display_name": "Billing address and shipping address same",
				"flag": "red",
				"value": "false",
				"is_display": true
			}, {
				"name": "_isFirstNameLastNameSame",
				"display_name": "User first name and last name same",
				"flag": "green",
				"value": "false",
				"is_display": true
			}, {
				"name": "_validEmail",
				"display_name": "Email Contains user first or last name",
				"flag": "red",
				"value": "false",
				"is_display": true
			}, {
				"name": "_shipAddressHasSecondField",
				"display_name": "Shipping address has second field",
				"flag": "green",
				"value": "true",
				"is_display": true
			}, {
				"name": "_isOrdTransIpMatch",
				"display_name": "Order and Transaction IP match",
				"flag": "green",
				"value": "true",
				"is_display": true
			}]
		}, {
			"user_id": "sagar_346",
			"order_id": "OCT45678",
			"score": 82,
			"flag": "red",
			"order_timestamp": "1970-01-18T03:00:49.970Z",
			"order_amount": "2500",
			"order_currency_code": "INR",
			"items": [{
				"item_id": "UI4567",
				"product_title": "PUMA Men's Running Shoes",
				"price": "1500",
				"currency_code": "INR",
				"upc": "09868676878878",
				"sku": "67688789",
				"isbn": null,
				"brand": "PUMA",
				"manufacturer": "PUMA INDIA",
				"category": "man > shoes",
				"tags": "man, sports, shoes",
				"color": "black",
				"quantity": "1",
				"is_on_sale": true,
				"max_quantity": "5",
				"discount_price": "2500",
				"product_weight": "0.5",
				"country": "IN",
				"description_short": "Black running shoes for man",
				"description": "Puma light weight shoes for long running",
				"seller_id": "puma23456",
				"seller_name": "PUMA INDIA"
			}, {
				"item_id": "AU67",
				"product_title": "Adidas T-shirt",
				"price": "2000",
				"currency_code": "INR",
				"upc": "098697676878878",
				"sku": "45688789",
				"isbn": null,
				"brand": "ADIDAS",
				"manufacturer": "ADIDAS",
				"category": "man > tshirt",
				"tags": "man, sports, tshirt",
				"color": "orange",
				"quantity": "1",
				"is_on_sale": false,
				"max_quantity": "0",
				"discount_price": null,
				"product_weight": "0.2",
				"country": "IN",
				"description_short": "Orange tshirt for man",
				"description": "Nice looking Orange adidas casual tshirt",
				"seller_id": "adi23456",
				"seller_name": "ADIDAS"
			}],
			"billing_address": {
				"name": "Sagar Sharma",
				"phone": "+919568987654",
				"address1": "C802, Nirvana Courtyard",
				"address2": "Nirvana Country, Sector 50",
				"city": "Gurgaon",
				"region": "Haryana",
				"country": "IN",
				"zipcode": "122002",
				"is_office_address": false,
				"is_home_address": true
			},
			"shipping_address": {
				"name": "Ajay Sharma",
				"phone": "+919545987654",
				"address1": "C115 Business park ",
				"address2": "Nirvana Country, Sector 50",
				"city": "Gurgaon",
				"region": "Haryana",
				"country": "IN",
				"zipcode": "122001",
				"is_office_address": false,
				"is_home_address": true
			},
			"transaction": {
				"id": "77788877762",
				"timestamp": "1970-01-18T03:00:49.970Z",
				"amount": "5000",
				"currency_code": "INR",
				"trans_type": "_sale",
				"status": "_success",
				"is_first_time_buyer": true
			},
			"payment_method": {
				"payment_type": "_creditCard",
				"payment_gateway": "payU",
				"account_name": "Sagar Sharma",
				"card_bin": "460345",
				"avs_response_code": "M",
				"cvv_response_code": "Y",
				"card_last4": "3456",
				"card_expiry_month": "05",
				"card_expiry_year": "2021",
				"amount": "3500",
				"currency_code": "INR"
			},
			"reasons": [{
				"name": "_numOfFailedTransactions",
				"display_name": "Number of failed transactions",
				"flag": "green",
				"value": "0",
				"is_display": true
			}, {
				"name": "_accountAge",
				"display_name": "Account age",
				"flag": "red",
				"value": "0",
				"is_display": true
			}, {
				"name": "_numAccountsWithSameIp",
				"display_name": "Number of accounts from same IP",
				"flag": "green",
				"value": "0",
				"is_display": true
			}, {
				"name": "_numOfOrderSameIp",
				"display_name": "Number of orders from same IP",
				"flag": "red",
				"value": "8",
				"is_display": true
			}, {
				"name": "_ipLocation",
				"display_name": "IP Address location",
				"flag": "grey",
				"value": "New Delhi",
				"is_display": true
			}, {
				"name": "_sameBillShippAddress",
				"display_name": "Billing address and shipping address same",
				"flag": "red",
				"value": "false",
				"is_display": true
			}, {
				"name": "_isFirstNameLastNameSame",
				"display_name": "User first name and last name same",
				"flag": "green",
				"value": "false",
				"is_display": true
			}, {
				"name": "_validEmail",
				"display_name": "Email Contains user first or last name",
				"flag": "red",
				"value": "false",
				"is_display": true
			}, {
				"name": "_shipAddressHasSecondField",
				"display_name": "Shipping address has second field",
				"flag": "green",
				"value": "true",
				"is_display": true
			}, {
				"name": "_isOrdTransIpMatch",
				"display_name": "Order and Transaction IP match",
				"flag": "green",
				"value": "true",
				"is_display": true
			}]
		}, {
			"user_id": "sagar_348",
			"order_id": "OCT45674",
			"score": 82,
			"flag": "red",
			"order_timestamp": "1970-01-18T03:00:49.970Z",
			"order_amount": "2500",
			"order_currency_code": "INR",
			"items": [{
				"item_id": "UI4567",
				"product_title": "PUMA Men's Running Shoes",
				"price": "1500",
				"currency_code": "INR",
				"upc": "09868676878878",
				"sku": "67688789",
				"isbn": null,
				"brand": "PUMA",
				"manufacturer": "PUMA INDIA",
				"category": "man > shoes",
				"tags": "man, sports, shoes",
				"color": "black",
				"quantity": "1",
				"is_on_sale": true,
				"max_quantity": "5",
				"discount_price": "2500",
				"product_weight": "0.5",
				"country": "IN",
				"description_short": "Black running shoes for man",
				"description": "Puma light weight shoes for long running",
				"seller_id": "puma23456",
				"seller_name": "PUMA INDIA"
			}, {
				"item_id": "AU67",
				"product_title": "Adidas T-shirt",
				"price": "2000",
				"currency_code": "INR",
				"upc": "098697676878878",
				"sku": "45688789",
				"isbn": null,
				"brand": "ADIDAS",
				"manufacturer": "ADIDAS",
				"category": "man > tshirt",
				"tags": "man, sports, tshirt",
				"color": "orange",
				"quantity": "1",
				"is_on_sale": false,
				"max_quantity": "0",
				"discount_price": null,
				"product_weight": "0.2",
				"country": "IN",
				"description_short": "Orange tshirt for man",
				"description": "Nice looking Orange adidas casual tshirt",
				"seller_id": "adi23456",
				"seller_name": "ADIDAS"
			}],
			"billing_address": {
				"name": "Sagar Sharma",
				"phone": "+919568987654",
				"address1": "C802, Nirvana Courtyard",
				"address2": "Nirvana Country, Sector 50",
				"city": "Gurgaon",
				"region": "Haryana",
				"country": "IN",
				"zipcode": "122002",
				"is_office_address": false,
				"is_home_address": true
			},
			"shipping_address": {
				"name": "Ajay Sharma",
				"phone": "+919545987654",
				"address1": "C115 Business park ",
				"address2": "Nirvana Country, Sector 50",
				"city": "Gurgaon",
				"region": "Haryana",
				"country": "IN",
				"zipcode": "122001",
				"is_office_address": false,
				"is_home_address": true
			},
			"transaction": {
				"id": "77788877762",
				"timestamp": "1970-01-18T03:00:49.970Z",
				"amount": "5000",
				"currency_code": "INR",
				"trans_type": "_sale",
				"status": "_success",
				"is_first_time_buyer": true
			},
			"payment_method": {
				"payment_type": "_creditCard",
				"payment_gateway": "payU",
				"account_name": "Sagar Sharma",
				"card_bin": "460345",
				"avs_response_code": "M",
				"cvv_response_code": "Y",
				"card_last4": "3456",
				"card_expiry_month": "05",
				"card_expiry_year": "2021",
				"amount": "3500",
				"currency_code": "INR"
			},
			"reasons": [{
				"name": "_numOfFailedTransactions",
				"display_name": "Number of failed transactions",
				"flag": "green",
				"value": "0",
				"is_display": true
			}, {
				"name": "_accountAge",
				"display_name": "Account age",
				"flag": "red",
				"value": "0",
				"is_display": true
			}, {
				"name": "_numAccountsWithSameIp",
				"display_name": "Number of accounts from same IP",
				"flag": "green",
				"value": "0",
				"is_display": true
			}, {
				"name": "_numOfOrderSameIp",
				"display_name": "Number of orders from same IP",
				"flag": "red",
				"value": "12",
				"is_display": true
			}, {
				"name": "_ipLocation",
				"display_name": "IP Address location",
				"flag": "grey",
				"value": "New Delhi",
				"is_display": true
			}, {
				"name": "_sameBillShippAddress",
				"display_name": "Billing address and shipping address same",
				"flag": "red",
				"value": "false",
				"is_display": true
			}, {
				"name": "_isFirstNameLastNameSame",
				"display_name": "User first name and last name same",
				"flag": "green",
				"value": "false",
				"is_display": true
			}, {
				"name": "_validEmail",
				"display_name": "Email Contains user first or last name",
				"flag": "red",
				"value": "false",
				"is_display": true
			}, {
				"name": "_shipAddressHasSecondField",
				"display_name": "Shipping address has second field",
				"flag": "green",
				"value": "true",
				"is_display": true
			}, {
				"name": "_isOrdTransIpMatch",
				"display_name": "Order and Transaction IP match",
				"flag": "green",
				"value": "true",
				"is_display": true
			}]
		}],
		"next": "7d12a3d059ad21540dd7f50025e04f824d013647f1d8ebd01528e08c6aad4fb794f2b72a2365020add2a93d57eb49ea69ffdafbdba635e5174533c5896c7"
	})
}
export default orders;