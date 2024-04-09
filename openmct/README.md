# Software de Control Autónomo de Embarcaciones de la Universidad de San Andrés

## Introduccion

En búsqueda de avances punteros en tecnología marítima, la Universidad de San Andrés presenta con orgullo su Software de Control Autónomo de Embarcaciones. Desarrollado por un equipo de investigadores e ingenieros dedicados, este software representa un gran avance en el ámbito de la navegación marítima autónoma.

## Funcionamiento

El Software funciona a través de varios ejes principlaes. Primero utiliza como base [OpenMCT](https://nasa.github.io/openmct/). Sumado a esto, utiliza distintos nodos de Ros2 Humble y NodeJs para crear servidores en tiempo real e historicos.

## Desarrollo

El desarrollo del software se basa en la creación de plugins que se integran a la plataforma de OpenMCT. Estos plugins se encargan de la visualización de datos en tiempo real y de la creación de historicos.

### Distribucion de carpetas

[/example-server](./example-server): En esta carpeta va todo lo relacionado con el server side, ya sea websocket puerto, etc.

[/assets](./assets): En esta carpeta se guardan todos los elementos de la UI, como imagenes, videos, etc.

[/plugins](./plugins):  Todos los plugins que se desarrollen de forma externa deben ser guardados en esta carpeta, cada plugin debe tener una función principal que va a ser útil para importarlo.

[/styles](./styles): En esta carpeta se guardan todos los estilos de la UI.

### Levantar el Projecto

Una vez clonado el projecto debemos hacer lo siguiente.

```terminal
npm install
npm start
```

### Importar plugin

El plugin se debe importar desde la carpeta [/plugins](./plugins) y se debe ejecutar la funcion  principal del archivo.

## Recursos utiles

Repositorio de [OpenMCT](https://github.com/nasa/openmct/blob/master/API.md)