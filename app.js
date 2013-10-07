/*
 * Project start-up file. To start this app, run "node app.js"
 */
var express = require('express');
var routes = require('./routes');
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

// session storage; placed before router
app.use(express.cookieParser());
app.use(express.session({
	secret : 'HABCD12365!'
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// For development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// To configure the route
app.get('/', routes.index);

// To start the server in port 3000
var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

// socket io connection
var io = require("socket.io").listen(server);

// Connect to the database
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'johnny',
	password : '',
});

var options = {
	host : 'stark-bastion-5706.herokuapp.com',
	port : 80,
	path : '/'
};

// Socket.io to "talk" to the front end socket
io.sockets.on("connection", function(socket) {
	socket.on("getAdherenceRecord", function() {
		// mysql database collection
		connection.connect(function(err) {
			console.log("Connect to db!");
			connection.query('use memoreX', function(err) {
				if (err)
					throw err;
				var query = "select * from drug_schedule order by day_of_week, time_of_day";
				connection.query(query, function(err, drug_schedule) {
					query = "select * from adherence order by completed_time";
					connection.query(query, function(err, adherence) {
						// For showing database past week patient's drug usage record
						socket.emit("receiveRecord", drug_schedule, adherence);
					});
				});
			});

		});
	});

	// To send a request to get the response from the drug holder device
	// frequently
	var intervalID = setInterval(function() {
		console.log("Calling now...");
		http.get(options, function(resp) {
			resp.setEncoding('utf8');
			resp.on("data", function(result) {
				console.log("Drug holder's result code: " + result);
				if (result) {
					socket.emit("deleteA", result);
				};
			});
		}).on("error", function(e) {
			console.log("Got error: " + e.message);
		});
	}, 2000);

});
