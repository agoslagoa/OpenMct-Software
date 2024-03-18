from setuptools import find_packages, setup

package_name = 'my_robot_controller'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='bruno',
    maintainer_email='bruno@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            "test_node = my_robot_controller.my_first_node:main",
            "draw_circle = my_robot_controller.draw_circle:main",
            "pose_subscriber = my_robot_controller.pose_subscriber:main",
            "turtle_controller = my_robot_controller.turtle_controller:main",
            "turtlebot3_subscriber = my_robot_controller.turtlebot3_subscriber:main",
            "image_subscriber = my_robot_controller.image_subscriber:main",
            "coordenates_publisher = my_robot_controller.coordenates_publisher:main",
            "coordenates_subscriber = my_robot_controller.coordenates_subscriber:main",
            "comand_control = my_robot_controller.comand_control:main",
            "img_test = my_robot_controller.img_test:main",
        ],
    },
)
