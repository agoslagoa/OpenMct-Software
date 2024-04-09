#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32
import asyncio
import websockets
import json
import time
class MultiSubscriberNode(Node):
    def __init__(self):
        super().__init__("multi_subscriber_node")
        self.get_logger().info("multi_subscriber_node has been started")
        self.subscriptions_ = {
            'V1_out': self.create_subscription(Int32, "/V1_out", self.create_callback('V1_out'), 10),
            'I2_out': self.create_subscription(Int32, "/I2_out", self.create_callback('I2_out'), 10),
            'H_out': self.create_subscription(Int32, "/H_out", self.create_callback('H_out'), 10),
            'T_out': self.create_subscription(Int32, "/T_out", self.create_callback('T_out'), 10),
            'V2_out': self.create_subscription(Int32, "/V2_out", self.create_callback('V2_out'), 10),
            'I1_out': self.create_subscription(Int32, "/I1_out", self.create_callback('I1_out'), 10),
        }
        self.values_ = {}
        self.loop = asyncio.get_event_loop()

    def create_callback(self, topic):
        def callback(msg):
            self.values_[topic] = msg.data
            self.get_logger().info(f'Received from {topic}: {msg.data}')
            self.get_logger().info(f'Current values: {self.values_}')
            json_message = json.dumps(self.values_)
            asyncio.get_event_loop().run_until_complete(self.send_to_websocket(json_message))
        return callback

    async def send_to_websocket(self, message):
        uri = "ws://localhost:8080/realtime/"
        try:
            async with websockets.connect(uri) as websocket:
                await websocket.send(message)
                print(f" TimeStamp: {time.time()} Sent: {message}")
                await asyncio.sleep(1)  # S
        except Exception as e:
            print(f"Error: {e}")

def main (args=None):
    rclpy.init(args=args)
    node = MultiSubscriberNode()
    rclpy.spin(node)
    rclpy.shutdown()

if __name__ == "__main__":
    main()