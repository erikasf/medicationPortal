
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'MemoreX',patientName: "Joseph Wong" });
};

exports.response = function(req,res){
    res.send("232323");	// 200 means the request is successful. The backbone is expected to have a JSON response object and therefore a dump object is created.
};