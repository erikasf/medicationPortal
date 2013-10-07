/*
 * The homepage, which is also the only page in this portal. For simple usage.
 */

exports.index = function(req, res) {
	res.render('index', {
		title : 'Medicine Portal',
		patientName : "Joseph Wong"
	});
};
