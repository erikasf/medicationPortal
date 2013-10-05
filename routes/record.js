/*
 * GET users listing.
 */

exports.show = function(req, res){
  res.render("record",{title:"Patient Drugs Record"});
};