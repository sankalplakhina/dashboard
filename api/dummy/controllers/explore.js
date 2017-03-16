const explore = (req, res) => {
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
}

export default explore;