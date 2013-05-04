var express = require('express'),
    socket = require('./config/socket.js');

var app = module.exports = express();
var server = require('http').createServer(app);

// Hook Socket.io into Express
socket.listen(server);

// Configuration
require('./config/environment.js')(app, express);

// Routes
require('./config/routes.js')(app);

// Start server
server.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});