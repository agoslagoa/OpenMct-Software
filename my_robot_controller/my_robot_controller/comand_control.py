#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
import websockets
import asyncio
import json

class CommandControl(Node):
    def __init__(self):
        super().__init__('command_control')
        self.publisher_ = self.create_publisher(Twist, 'cmd_vel', 10)
        self.websocket_uri = 'ws://localhost:8080/realtime/commands'
        self.current_velocity = Twist()
        self.connect_to_websocket()


    def connect_to_websocket(self):
        self.get_logger().info('Connecting to WebSocket server...')
        asyncio.get_event_loop().run_until_complete(self.websocket_listener())

    async def websocket_listener(self):
        async with websockets.connect(self.websocket_uri) as websocket:
            self.get_logger().info(f'Connected to WebSocket server at {self.websocket_uri}')
            while True:
                message = await websocket.recv()
                self.process_message(message)

    def process_message(self, message):
        data = json.loads(message)
        command = data.get('command')
        self.get_logger().info('Received command: "%s"' % command)
        if command == 'w':
            self.current_velocity.linear.x += 0.01 # Move forward
        elif command == 'a':
            self.current_velocity.angular.z += 0.01  # Turn left
        elif command == 's':
            self.current_velocity.linear.x = 0.0  # Stop
            self.current_velocity.angular.z = 0.0
        elif command == 'd':
            self.current_velocity.angular.z += -0.01  # Turn right
        elif command == 'x':
            self.current_velocity.linear.x += -0.01  # Move backward
        self.publisher_.publish(self.current_velocity)
        self.get_logger().info('Publishing twist: "%s"' % self.current_velocity)

def main(args=None):
    rclpy.init(args=args)
    node = CommandControl()
    rclpy.spin(node)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
