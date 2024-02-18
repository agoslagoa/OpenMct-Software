function cameraView() {
  // create new img
    const img = document.createElement('img');
    img.classList.add('camera');
    var contentDiv = document.querySelector('.c-inspector.js-inspector');
    // add it to the body
    contentDiv.appendChild(img);

    var socket = new WebSocket(location.origin.replace(/^http/, 'ws') + '/realtime/camera1');
    socket.onmessage = function (event) {
        var blob = new Blob([event.data], {type: 'image/png'});
        var url = URL.createObjectURL(blob);
        img.src = url;
    };
    
    // if i dont recieve any image i want to sho an image called nosignal
    console.log(img.src);
    if (img.src === '' ) {
        img.src = "../assets/images/NoSignal.jpg";
    }
}
