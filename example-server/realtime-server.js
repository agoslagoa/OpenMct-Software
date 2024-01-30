        var express = require('express');
        const WebSocket = require('ws');
        function RealtimeServer(boat) {

            var router = express.Router();

            router.ws('/', function (ws) {
                var unlisten = boat.listen(notifySubscribers);
                var subscribed = {}; // Active subscriptions for this connection
                var handlers = { // Handlers for specific requests
                        subscribe: function (id) {
                            subscribed[id] = true;
                        },
                        unsubscribe: function (id) {
                            delete subscribed[id];
                        }
                    };

                function notifySubscribers(point) {
                    if (subscribed[point.id]) {
                        ws.send(JSON.stringify(point));
                    }
                }

                // Listen for requests
                ws.on('message', function (message) {
                    console.log("message: " + message)
                    boat.updateState(message);
                    var parts = message.split(' '),
                        handler = handlers[parts[0]];
                    if (handler) {
                        handler.apply(handlers, parts.slice(1));
                    }
                });

                // Stop sending telemetry updates for this connection when closed
                ws.on('close', unlisten);
            });

            const clients = new Set();

            router.ws('/coordenates', function (ws) {
                // Add the new client to the set
                clients.add(ws);
    
                ws.on('message', function (message) {
                    clients.forEach(client => {
                                     // Check if the client is still connected before sending
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(message);
                        }
                })});
                ws.on('close', function () {
                            // Remove the client from the set when it's closed
                            clients.delete(ws);
                        });
            });

            return router;
        };

        module.exports = RealtimeServer;
