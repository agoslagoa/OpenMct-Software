function MapPlugin() {

    var socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/realtime/coordenates');
    var listener = {};
    let mapContainer = document.createElement('div');
    mapContainer.id = 'map-container';
    mapContainer.classList.add('map-container');

    var contentDiv = document.querySelector('.c-inspector.js-inspector');
    contentDiv.appendChild(mapContainer);

    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.classList.add('map');
    mapContainer.appendChild(mapDiv);

    socket.onopen = function (event) {
        console.log('Connection established');
    }

    var map = L.map('map', {
        center: [0, 0],
        zoom: 13,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        zoomControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    socket.onmessage = function (event) {
        console.log('Message event:', event);
        try {
            var point = JSON.parse(event.data);
            console.log(point);

            // Update the map view to the received coordinates
            map.setView([point['coordenate-x'], point['coordenate-y']], 13);

            // Add a marker at the received coordinates
            var customIcon = L.icon({
                        iconUrl: '../assets/images/BoatIcon.png', // Replace with the path to your custom icon/image
                        iconSize: [32, 32], // Adjust the size of the icon
                        iconAnchor: [16, 32], // Adjust the anchor point of the icon
                        popupAnchor: [0, -32] // Adjust the popup anchor point
                    });
            
                    // Add a marker with the custom icon at the user's current location
                    var boatMarker = L.marker([point['coordenate-x'], point['coordenate-y']], { icon: customIcon }).addTo(map);
        } catch (error) {
            console.error('Error parsing message data:', error);
        }
    }
}
