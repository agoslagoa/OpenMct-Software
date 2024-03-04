/**
 * Basic implementation of a history and realtime server.
 */ 
require('dotenv').config();
var Spacecraft = require('./spacecraft');
var Boat = require('./boat'); 
var RealtimeServer = require('./realtime-server');
var HistoryServer = require('./history-server');
var StaticServer = require('./static-server');
var rclnodejs = require('rclnodejs');

const PNG = require('pngjs').PNG;
const WebSocket = require('ws');


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

var socket = new WebSocket('ws://localhost:'+process.env.PORT+'/realtime/camera1');
    rclnodejs.init().then(() => {
        const node = rclnodejs.createNode('image_node');
        const Image = 'sensor_msgs/msg/Image';
      
        let subscription = node.createSubscription(Image, '/pi_camera/image_raw', (msg) => {
          //console.log('Received image:', msg);
      
          // Create an image object from the raw data
          let rawImageData = {
            data: Buffer.from(msg.data),
            width: msg.width,
            height: msg.height
          };
      
          // Create a new PNG object
          let png = new PNG({
            width: rawImageData.width,
            height: rawImageData.height,
            filterType: -1
          });
      
          // Copy the image data to the PNG object
          for (let y = 0; y < png.height; y++) {
            for (let x = 0; x < png.width; x++) {
              let idx = (png.width * y + x) * 3;
              let idxPng = (png.width * y + x) << 2;
              png.data[idxPng] = rawImageData.data[idx];     // Red
              png.data[idxPng+1] = rawImageData.data[idx+1]; // Green
              png.data[idxPng+2] = rawImageData.data[idx+2]; // Blue
              png.data[idxPng+3] = 255;                      // Alpha
            }
          }
      
          // Convert the PNG to a Buffer
          const pngBuffer = PNG.sync.write(png);
      
          // Send the image data to all connected WebSocket clients
          socket.send(pngBuffer);
        });
      
        rclnodejs.spin(node);
      }).catch((err) => {
        console.error(err);
      });
var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('Open MCT hosted at http://localhost:' + port);
    console.log('History hosted at http://localhost:' + port + '/history');
    console.log('Realtime hosted at ws://localhost:' + port + '/realtime');
});
