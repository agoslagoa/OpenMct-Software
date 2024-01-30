//make web socket server i need to see if the the coordenates are being send

const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

app.ws('/coordenates', function(ws, req) {
  ws.on('message', function(msg) {
    try {
      const coordinates = JSON.parse(msg);
      console.log(coordinates);
    } catch (error) {
      console.error('Error parsing message data:', error);
    }
  });
});


app.listen(8080, () => console.log('Server listening on port 8080'));