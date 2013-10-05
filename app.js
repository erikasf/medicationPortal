
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var about = require('./routes/about');
var record = require('./routes/record');
var http = require('http');
var path = require('path');
var mysql = require('node-mysql/node_modules/mysql');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', about.show);
app.get('/record', record.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Connect to the database
var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'johnny',
	  password : '',
	});

connection.connect(function(err) {
	  console.log("Connect to db!");	  
	  connection.query('use memoreX', function(err) {
		  if (err) throw err;
		  	var query = "select * from patient";
		  	connection.query(query,function(err,result){
		  		console.log("Hello world" + result[0].patient_age);
		  	});
		});
	  
	});
