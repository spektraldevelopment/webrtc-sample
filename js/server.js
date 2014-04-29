//useful libs
var http = require("http");
var fs = require("fs");
var websocket = require("websocket").server;

//general variables
var port = 1234;
var webrtcClients = [];
var webrtcDiscussions = [];

//web server functions
var httpServer = http.createServer(function(request, response) {
    response.write(page);
    response.end();
});