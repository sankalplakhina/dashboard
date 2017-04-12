const overview = (req, res) => {
	res.json({
	  "total": 6,
	  "average_score": 76,
	  "average_amount": 2500,
	  "risky_orders": 5
	});
}
export default overview;