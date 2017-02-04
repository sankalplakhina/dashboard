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
								{name: 'Group A', value: 400},
								{name: 'Group B', value: 300},
								{name: 'Group C', value: 300},
								{name: 'Group D', value: 200}
							],
							colors: [
								'#0088FE',
								'#00C49F',
								'#FFBB28',
								'#FF8042'
							],
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
			message: 'Analyze API',
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
