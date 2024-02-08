function cameraView() {
  // create new img
    const img = document.createElement('img');
    // add it to the body
    document.body.appendChild(img);

    var socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/realtime/camera1');
    socket.onmessage = function (event) {
        var blob = new Blob([event.data], {type: 'image/png'});
        var url = URL.createObjectURL(blob);
        img.src = url;
    };
    
}
