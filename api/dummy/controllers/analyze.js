const analyze = (req, res) => {
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
}

export default analyze;