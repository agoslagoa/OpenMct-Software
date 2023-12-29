function Ros2RealtimeTelemetry() {
    return function (openmct) {
        var socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/realtime/test/');

        socket.onmessage = function (event) {
            console.log('Received message:', event.data); // Add this line to log the received message
        };
    }
}
