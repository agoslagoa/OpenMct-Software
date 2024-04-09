#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32

class I2_out_subcriberNode(Node):
    def __init__(self):
        super().__init__("I2_subcriber_node")
        self.get_logger().info("pose_subscriber_node has been started")
        self.pose_subscirber_ = self.create_subscription(Int32, "/I2_out", self.pose_callback, 10)
    
    def pose_callback(self, msg):
        self.get_logger().info(str(msg.data))

def main (args=None):
    rclpy.init(args=args)
    node = I2_out_subcriberNode()
    rclpy.spin(node)
    rclpy.shutdown()