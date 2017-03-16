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

const review = (req, res) => {
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
};

export default review;