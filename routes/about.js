
/*
 * GET users listing.
 */

exports.show = function(req, res){
  res.render("about",{title: "About Us",patientName: "Joseph Wong"});
};