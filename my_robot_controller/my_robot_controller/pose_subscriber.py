#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from turtlesim.msg import Pose

class PoseSubscriberNode(Node):
    def __init__(self):
        super().__init__("pose_subscriber_node")
        self.get_logger().info("pose_subscriber_node has been started")
        self.pose_subscirber_= self.create_subscription(Pose,"/turtle1/pose",self.pose_callback,10)
    
    def pose_callback(self,msg:Pose):
        self.get_logger().info("x: "+str(msg.x)+" y: "+str(msg.y)+" theta: "+str(msg.theta))

def main (args=None):
    rclpy.init(args=args)
    node = PoseSubscriberNode()
    rclpy.spin(node)
    rclpy.shutdown()