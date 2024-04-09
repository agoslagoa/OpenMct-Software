const WebSocket = require('ws');

const url = 'ws://localhost:8080/realtime/'; // replace with your WebSocket server URL
const connection = new WebSocket(url);

connection.onopen = () => {
  console.log('Connected to WebSocket server');
};

connection.onerror = (error) => {
  console.error(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  console.log(e.data);
};