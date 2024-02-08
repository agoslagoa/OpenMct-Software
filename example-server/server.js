/**
 * Basic implementation of a history and realtime server.
 */
require('dotenv').config();
var Spacecraft = require('./spacecraft');
var Boat = require('./boat'); 
var RealtimeServer = require('./realtime-server');
var HistoryServer = require('./history-server');
var StaticServer = require('./static-server');

var expressWs = require('express-ws');
var app = require('express')();
expressWs(app);

var boat = new Boat();
var realtimeServer = new RealtimeServer(boat);
var historyServer = new HistoryServer(boat);
var staticServer = new StaticServer();

app.use('/realtime', realtimeServer);
app.use('/history', historyServer);
app.use('/', staticServer);

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('Open MCT hosted at http://localhost:' + port);
    console.log('History hosted at http://localhost:' + port + '/history');
    console.log('Realtime hosted at ws://localhost:' + port + '/realtime');
});
