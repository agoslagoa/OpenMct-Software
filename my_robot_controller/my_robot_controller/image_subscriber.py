#!/usr/bin/env python3
import base64
from datetime import datetime
import rclpy
from rclpy.node import Node     
from sensor_msgs.msg import Image
import asyncio
import websockets
import time
import json
import io
import numpy as np
from PIL import Image as PilImage
from cv_bridge import CvBridge
import cv2
import matplotlib.pyplot as plt
class ImgSubscriberNode(Node):
    def __init__(self):
        super().__init__("img_subscriber_node")
        self.get_logger().info("img_subscriber_node has been started")
        self.img_subscriber_ = self.create_subscription(Image, "/pi_camera/image_raw", self.img_callback,10)


    def img_callback(self, msg):
        # Convert ROS Image message to numpy array
        img_array = np.frombuffer(msg.data, dtype=np.uint8).reshape(msg.height, msg.width, -1)

    # Convert numpy array to PIL Image
        img = PilImage.fromarray(img_array)

        # Generate a unique filename using the current timestamp
        filename = datetime.now().strftime('%Y%m%d%H%M%S') + '.jpg'

        # Save the image to a file
        img.save(filename)


def main (args=None):
    rclpy.init(args=args)
    node = ImgSubscriberNode()
    rclpy.spin(node)
    rclpy.shutdown()