# Software de Control Autónomo de Embarcaciones de la Universidad de San Andrés

## Levantar el proyecto de forma local

Para correr el proyecto de forma local se debe tener instalado [Node Js](https://nodejs.org/en) y [Ros 2 Humble](https://docs.ros.org/en/humble). Para correr el proyecto leer el [README]([openmct/README.md](https://github.com/BrunoDC-dev/OpenMct-Software/blob/d2c2a1f1ecc7f1c6bfd29db2bedeb63862d85858/openmct/README.md)) en \openmct.

## Levantar el proyecto desde un contenedor de Docker (WIP)

### Recomendado para windows

Para correr el proyecto desde un contenedor de Docker se debe tener instalado y corriendo el servicio de [Docker](https://docs.docker.com/get-docker/) y ejecutar los siguientes comandos desde la terminal en el path correspondiente a este proyecto:

```termial

    docker build -t nautilus .

```

> **Advertencia**: El build puede tardar varios minutos la primera vez que se corre. Se recomienda tener una buena conexión a internet.

```terminal

    docker run -p 8080:8080 nautilus

```
