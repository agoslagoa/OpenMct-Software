import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
import websockets
import asyncio
import base64
import numpy as np
import cv2

class ImageSubscriber(Node):

    def __init__(self):
        super().__init__('image_subscriber')
        self.subscription = self.create_subscription(
            Image,
            '/pi_camera/image_raw',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    async def send_image(self, img):
        uri = "ws://localhost:8080"
        async with websockets.connect(uri) as websocket:
            await asyncio.sleep(1)  # Add a delay of one second
            await websocket.send(img)

    def listener_callback(self, msg):
        # Convert ROS Image message to OpenCV image
        img = np.frombuffer(msg.data, dtype=np.uint8).reshape(msg.height, msg.width, -1)

        # Compress the image
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 100]  # 90 is the JPEG quality (0-100)
        _, img_encoded = cv2.imencode('.jpg', img, encode_param)
        img_base64 = base64.b64encode(img_encoded)

        # Send image over WebSocket
        asyncio.get_event_loop().run_until_complete(self.send_image(img_base64))

def main(args=None):
    rclpy.init(args=args)

    image_subscriber = ImageSubscriber()

    rclpy.spin(image_subscriber)

    image_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()