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
