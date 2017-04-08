/*!
 * app.js
 * 
 * Entrypoint file for the application.
 * Author: Abner Castro
 * Date: April 7th, 2017
 */

var express = require('express');
var path = require('path');

// Starts ExpressJS app
var app = express();

// Sets up variables
app.set('port', process.env.PORT || 3000);

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

// View Engine -- pug
app.set('views', './views');
app.set('view engine', 'pug');

// root route
app.get('/', function(req, res) {
	res.render('index', {
		title: "Welcome!"		
	});
});

app.listen(app.get('port'), function() {
	console.log('Server has started on port', app.get('port'));
});