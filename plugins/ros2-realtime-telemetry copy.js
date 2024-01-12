
  function Ros2RealtimeTelemetry (boatsystem){
    return function install(openmct) {
            var socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/realtime/');
            var listener = {};

        
        socket.onmessage = function (event) {
            var point = JSON.parse(event.data);
            
            if (point.value < 0) { // Check if the value is negative 
            
                boatsystem.addAlert(point.id)
                boatsystem.createAlert();
            
            }else if(boatsystem.checkAlert(point.id)){
            
                boatsystem.removeAlert(point.id) // Remove the alert if the value is positive   
                if (boatsystem.getAlertsAmount() == 0) {
                    boatsystem.stopAlertSound();
                }
            }
            if (listener[point.id]) {
                listener[point.id](point);
            }
        };

            var provider = {
                supportsSubscribe: function (domainObject) {
                    return domainObject.type === 'example.telemetry';
                },
                subscribe: function (domainObject, callback) {
                    listener[domainObject.identifier.key] = callback;
                    socket.send('subscribe ' + domainObject.identifier.key);
                    return function unsubscribe() {
                        delete listener[domainObject.identifier.key];
                        socket.send('unsubscribe ' + domainObject.identifier.key);
                    }
                }
            };

            openmct.telemetry.addProvider(provider);
        }
        }

