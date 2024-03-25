FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update -y && \
    apt upgrade -y && \
    apt install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs


RUN apt-get install -y locales && locale-gen en_US.UTF-8 && update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
ENV LANG=en_US.UTF-8

    RUN apt-get install -y software-properties-common && add-apt-repository universe

    RUN apt update -y && apt install -y curl && curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

    RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | tee /etc/apt/sources.list.d/ros2.list > /dev/null

    RUN apt update -y && apt upgrade -y

    RUN apt install ros-humble-desktop -y

RUN /bin/bash -c "source /opt/ros/humble/setup.bash"    



COPY . .

# Change the working directory to 'openmct'
WORKDIR /openmct

RUN /bin/bash -c "source /opt/ros/humble/setup.bash && npm install"
# Expose port 3000
EXPOSE 3000

CMD /bin/bash -c "source /opt/ros/humble/setup.bash && npm start"

## RUN /bin/bash -c "source /opt/ros/humble/setup.bash && ros2 run demo_nodes_cpp talker"