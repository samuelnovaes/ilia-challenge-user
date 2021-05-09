module.exports = (error, res) => {
	console.error(error.stack);
	res.status(error.code || 500).json({ error: error.message });
};