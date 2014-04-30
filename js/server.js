//useful libs
var http = require("http");
var fs = require("fs");
var websocket = require("websocket").server;
var page = undefined;

//general variables
var port = 1234;
var webrtcClients = [];
var webrtcDiscussions = [];

//web server functions
var server = http.createServer(function(request, response) {
    response.write(page);
    response.end();
});

server.listen(port, function() {
  log("Server listening on port: " + port);
});

fs.readFile("index.html", function(error, data) {
    if (error) {
        console.error("fs.readFile error: " + error);
    } else {
        page = data;
    }
});

//web socket functions
var websocketServer = new websocket({
    httpServer: server
});

websocketServer.on("request", function(request) {
    log("new request: " + request.origin);

    var connection = request.accept(null, request.origin);
    log("new connection: " + connection.remoteAddress);

    webrtcClients.push(connection);
    connection.id = webrtcClients.length - 1;

    connection.on(message, function() {
        if (message.type === "utf8") {
            log("got message: " + message.utf8Data);
        }

        var signal = undefined;
        try { signal = JSON.parse(message.utf8Data); } catch (err) {};
    });

    if (signal) {
        if (signal.type === "join" && signal.token !== undefined) {

            try {
                if (webrtcDiscussions[signal.token] === undefined) {
                    webrtcDiscussions[signal.token] = {};
                }
            } catch (err) {};

            try {
               webrtcDiscussions[signal.token][connection.id] = true;
            } catch (err) {};

        } else if (signal.token !== undefined) {

            try {
                Object.keys(webrtcDiscussions[signal.token]).forEach(function (id) {
                    if (id !== connection.id) {
                        webrtcClients[id].send(message.utf8Data, function() {
                            console.error("Error occurred!");
                        });
                    }
                });
            } catch (err) {}

        } else {
            log("invalid signal: " + message.utf8Data);
        }
    } else {
        log("invalid signal: " + message.utf8Data);
    }

});

function log(msg) {
  console.log(new Date() + " : " + msg);
}