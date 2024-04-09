#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class DrawCircleNode(Node):
    def __init__(self):
        super().__init__("draw_circle_node")
        self.get_logger().info("draw_circle_node has been started")
        self.cmd_vel_pub_ = self.create_publisher(Twist,"/turtle1/cmd_vel",10)
        self.timer_ = self.create_timer(1.0,self.send_velocity_command)
    def send_velocity_command (self):  # Fix: Corrected the spelling of "self"
        msg=Twist()
        msg.linear.x=2.0
        msg.angular.z=1.0
        self.cmd_vel_pub_.publish(msg)  

def main (args=None):
    rclpy.init(args=args)
    node = DrawCircleNode()
    rclpy.spin(node) 
    rclpy.shutdown()