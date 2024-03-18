#!/usr/bin/env python3
import json
import rclpy
from rclpy.node import Node     
from geometry_msgs.msg import Twist
import asyncio
import websockets
import time
class PoseSubscriberNode(Node):
    def __init__(self):
        super().__init__("pose_subscriber_node")
        self.get_logger().info("pose_subscriber_node has been started")
        self.pose_subscriber_ = self.create_subscription(Twist, "/cmd_vel", self.pose_callback,10)
        self.loop = asyncio.get_event_loop()

    def pose_callback(self, msg: Twist):
        data = {
            "linear-x": msg.linear.x,
            "linear-y": msg.linear.y,
            "linear-z": msg.linear.z,
            "angular-x": msg.angular.x,
            "angular-y": msg.angular.y,
            "angular-z": msg.angular.z,
        }

        # Convert the dictionary to a JSON string
        json_message = json.dumps(data)

        # Log the JSON message
        self.get_logger().info(f"Received pose: {json_message}")

        # Send the JSON message to the WebSocket server
        asyncio.get_event_loop().run_until_complete(self.send_to_websocket(json_message))

    async def send_to_websocket(self, message):
        uri = "ws://localhost:8080/realtime/"
        try:
            async with websockets.connect(uri) as websocket:
                await websocket.send(message)
                print(f" TimeStamp: {time.time()} Sent: {message}")
                await asyncio.sleep(1)  # S
        except websockets.exceptions.ConnectionClosedError:
            print("Error: Failed to connect to the server.")



def main (args=None):
    rclpy.init(args=args)
    node = PoseSubscriberNode()
    rclpy.spin(node)
    rclpy.shutdown()