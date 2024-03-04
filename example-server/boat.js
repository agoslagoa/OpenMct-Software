const uploadTelemetry = require('./CouchDB');
function Boat () {
    
        this.state= {
            "linear-x":0,
            "linear-y":0,
            "linear-z":0,
            "angular-x":0,
            "angular-y":0,
            "angular-z":0,
            "comms.sent":0
        };
        this.history = {}
        this.listeners = []
        Object.keys(this.state).forEach(function (k) {
            this.history[k] = [];
        }, this);

        console.log("Boat launched!");

}

Boat.prototype.updateState = function (message) {
        var timestamp = Date.now(), sent = 0;
        console.log("message: " + typeof message);
        try {
            message = JSON.parse(message);
        } catch (error) {
            console.log("error: " + error);
        }
        Object.keys(this.state).forEach(function (id) {
            var state = { timestamp: timestamp, value:  message[id], id: id};
            uploadTelemetry(id, message[id])
            this.notify(state);
            this.history[id].push(state);
            this.state["comms.sent"] += JSON.stringify(state).length;
        }, this);
}
Boat.prototype.notify = function (state) {
    this.listeners.forEach(function (l) {
        l(state);
    });
}

Boat.prototype.listen = function (listener) {
    this.listeners.push(listener);
    return function () {
        this.listeners = this.listeners.filter(function (l) {
            return l !== listener;
        });
    }.bind(this);
}

module.exports = function () {
    return new Boat();
}