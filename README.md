# Software de Control Autónomo de Embarcaciones de la Universidad de San Andrés

## Levantar el proyecto 
 Para iniciar el proyecto se recomienda levantarlo de forma local utlizando Node Js Y Ros 2 Humble. Como sistema operativo se enfatiza el uso de Linux Ubuntu ya que facilitará su uso y/o desarrollo.

 Node Js: https://nodejs.org/en
 
 Ros 2: https://docs.ros.org/en/humble

 Como alternativa, se propone desarrollar el proyecto en Docker.
    Debe ejecutar los siguientes comandos:
 ``` 
    docker build -t Nautilus .
```

Cuando finalice debe ejecutar:

```
    docker run -p 8080:8080 Nautilus
```# Software de Control Autónomo de Embarcaciones de la Universidad de San Andrés

## Levantar el proyecto de forma local

Para correr el proyecto de forma local se debe tener instalado [Node Js](https://nodejs.org/en) y [Ros 2 Humble](https://docs.ros.org/en/humble). Para correr el proyecto leer el [README](./openmct/README.md) en \openmct.

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
