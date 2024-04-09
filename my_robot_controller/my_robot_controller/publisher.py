#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32
import random
import time

class MultiPublisherNode(Node):
    def __init__(self):
        super().__init__("multi_publisher_node")
        self.get_logger().info("multi_publisher_node has been started")
        self.publishers_ = {
            'V1_out': self.create_publisher(Int32, "/V1_out", 10),
            'I2_out': self.create_publisher(Int32, "/I2_out", 10),
            'H_out': self.create_publisher(Int32, "/H_out", 10),
            'T_out': self.create_publisher(Int32, "/T_out", 10),
            'V2_out': self.create_publisher(Int32, "/V2_out", 10),
            'I1_out': self.create_publisher(Int32, "/I1_out", 10),
        }

    def publish_random_number(self):
        for topic, publisher in self.publishers_.items():
            msg = Int32()
            msg.data = random.randint(1, 100)
            publisher.publish(msg)
            self.get_logger().info(f'Published to {topic}: {msg.data}')

def main (args=None):
    rclpy.init(args=args)
    node = MultiPublisherNode()

    # Publish a random number to each topic every second
    while rclpy.ok():
        node.publish_random_number()
        time.sleep(1)

    rclpy.shutdown()

if __name__ == "__main__":
    main()