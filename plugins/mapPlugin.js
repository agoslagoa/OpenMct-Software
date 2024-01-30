function MapPlugin() {

    var socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/realtime/coordenates');
    var listener = {};
    socket.onopen = function (event) {
        console.log('Connection established');
    }

socket.onmessage = function (event) {
    console.log('Message event:', event);
    try {
        var point = JSON.parse(event.data);
        console.log(point);
    } catch (error) {
        console.error('Error parsing message data:', error);
    }
}
    //<div id="map" style="height: 500px;"></div>
    // create this div
    // let mapDiv = document.createElement('div');
    // mapDiv.id = 'map';
    // mapDiv.style.height = '500px';
    // document.body.appendChild(mapDiv);
    
    // // Initialize the map
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     var lat = position.coords.latitude;
    //     var lng = position.coords.longitude;

    //     // Set the map view to the user's current location
    //     var map = L.map('map').setView([lat, lng], 13);

    //     // Add a tile layer (you can use different providers, e.g., OpenStreetMap)
    //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attribution: '© OpenStreetMap contributors'
    //     }).addTo(map);

    //     // Add a custom icon
    //     var customIcon = L.icon({
    //         iconUrl: '../assets/images/BoatIcon.png', // Replace with the path to your custom icon/image
    //         iconSize: [32, 32], // Adjust the size of the icon
    //         iconAnchor: [16, 32], // Adjust the anchor point of the icon
    //         popupAnchor: [0, -32] // Adjust the popup anchor point
    //     });

    //     // Add a marker with the custom icon at the user's current location
    //     var boatMarker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    //     boatMarker.bindPopup("Your Boat").openPopup();

    // }); // Add closing parenthesis here
}
