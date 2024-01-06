
  function Ros2RealtimeTelemetry (){
    return function install(openmct) {
            var socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/realtime/');
            var listener = {};

           // Create a notification container in the DOM
        var toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);

        socket.onmessage = function (event) {
            var point = JSON.parse(event.data);

            if (point.value < 0) { // Check if the value is negative   
                var toast = document.createElement('div')
                var icon = document.createElement('i');
                icon.classList.add('fa-solid');
                icon.classList.add('fa-exclamation-triangle');
                toast.classList.add('toast');
                toast.innerText = 'Negative value error! for ' + point.id +  ' with value ' + point.value.toFixed(4) + '';
                toast.setAttribute('data-aos', 'zoom-in-down');
                toastContainer.appendChild(toast);
                toast.insertBefore(icon, toast.firstChild); // Insert the icon as the first child of the toast

                // Hide the toast after some time (e.g., 3 seconds)
                setTimeout(function () {
                    toast.remove();
                }, 3000);
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

