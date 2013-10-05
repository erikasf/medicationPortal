
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

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

//session storage; placed before router
app.use(express.cookieParser());
app.use(express.session({secret: 'HABCD12365!'}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.response);
app.get('/about', about.show);
app.get('/record', record.show);

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

//socket io connection
var io = require("socket.io").listen(server);

//Connect to the database
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'johnny',
	password : '',
});

io.sockets.on("connection",function(socket){
	socket.on("getAdherenceRecord",function(){
		connection.connect(function(err) {
			console.log("Connect to db!");	  
			connection.query('use memoreX', function(err) {
				if (err) throw err;
				var query = "select * from drug_schedule order by day_of_week, time_of_day";
				connection.query(query,function(err,drug_schedule){
					query = "select * from adherence order by completed_time";
					connection.query(query, function(err,adherence){
						socket.emit("receiveRecord",drug_schedule,adherence);
					});
				});
			});

		});
	});

});
