#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Point

class CoordenatesPublisherNode(Node):
    def __init__(self):
        super().__init__("pose_subscriber_node")
        self.get_logger().info("pose_subscriber_node has been started")
        self.boat_position_publisher_ = self.create_publisher(Point, "boat_position", 10)
        self.timer = self.create_timer(2.0, self.publish_coordinates)

    def publish_coordinates(self):
        # Create a Point message and set the x and y coordinates
        boat_position = Point()
        boat_position.x = 1.0  # Replace with your actual x coordinate
        boat_position.y = 2.0  # Replace with your actual y coordinate
        
        # Publish the boat_position message
        self.boat_position_publisher_.publish(boat_position)

def main (args=None):
    rclpy.init(args=args)
    node = CoordenatesPublisherNode()
    rclpy.spin(node)
    rclpy.shutdown()