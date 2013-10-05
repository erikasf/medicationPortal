
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'MemoreX',patientName: "Joseph Wong" });
};