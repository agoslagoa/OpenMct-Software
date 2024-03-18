#!/usr/bin/env python3
import json
import rclpy
from rclpy.node import Node     
from geometry_msgs.msg import Point
import asyncio
import websockets
import time
class CoordenatesSubscriberNode(Node):
    def __init__(self):
        super().__init__("pose_subscriber_node")
        self.get_logger().info("pose_subscriber_node has been started")
        self.pose_subscriber_ = self.create_subscription(Point, "boat_position", self.pose_callback,10)
        self.loop = asyncio.get_event_loop()

    def pose_callback(self, msg: Point):
        data = {
            "coordenate-x": msg.x,
            "coordenate-y": msg.y,
        }

        # Convert the dictionary to a JSON string
        json_message = json.dumps(data)

        # Log the JSON message
        self.get_logger().info(f"Received pose: {json_message}")

        # Send the JSON message to the WebSocket server
        asyncio.get_event_loop().run_until_complete(self.send_to_websocket(json_message))

    async def send_to_websocket(self, message):
        uri = "ws://localhost:8080/realtime/coordenates"
        try:
            async with websockets.connect(uri) as websocket:
                await websocket.send(message)
                print(f" TimeStamp: {time.time()} Sent: {message}")
                await asyncio.sleep(1)  # S
        except websockets.exceptions.ConnectionClosedError:
            print("Error: Failed to connect to the server.")



def main (args=None):
    rclpy.init(args=args)
    node = CoordenatesSubscriberNode()
    rclpy.spin(node)
    rclpy.shutdown()