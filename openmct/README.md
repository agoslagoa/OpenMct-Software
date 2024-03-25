# Software de Control Autónomo de Embarcaciones de la Universidad de San Andrés

## Introduccion

En búsqueda de avances punteros en tecnología marítima, la Universidad de San Andrés presenta con orgullo su Software de Control Autónomo de Embarcaciones. Desarrollado por un equipo de investigadores y ingenieros dedicados, este software representa un gran avance en el ámbito de la navegación marítima autónoma.

### Funcionamiento

El Software funciona a traves de varios ejes principlaes, primero utiliza commo base [OpenMCT](https://nasa.github.io/openmct/) Sumado a esto utiliza distintos nodos de Ros2 HUmble NodeJs para crear servidores en tiempo real e historicos

### Desarrollo

A la hora de desarrrollar hay algunas cosas que se deben en  tener en cuenta de como es funcionamiento dee la aplicacion

#### Distribucion de carpetas

[/example-server]([openmct/example-server](https://github.com/BrunoDC-dev/OpenMct-Software/blob/f48aa8e0e69e603baef0ddbe5b6d1a4b6d17622c/openmct/example-server)): En esta carpeta es donde se va todo lo relacionado con el server side, ya sea websocket puerto,etc

[/assets]([openmct/assets](https://github.com/BrunoDC-dev/OpenMct-Software/blob/d2c2a1f1ecc7f1c6bfd29db2bedeb63862d85858/openmct/assets)):  En Assets se huardo todo lo cosmetico para la pagina ya sean sonidos imagesnes gif o cualquier otro archivo adicional que no tenga otra fucnion que ser decorativo

[/plugins](https://github.com/BrunoDC-dev/OpenMct-Software/blob/4c1eb62675c089ad1c0baae3782f645b95f7deeb/openmct/plugins):  Todos los plugins que se desarrollen de forma externa deben ser guardados en esta carpeta, cada plugin debe tenr una funcion principal que va a ser util para importarlo

[/styles](https://github.com/BrunoDC-dev/OpenMct-Software/blob/4c1eb62675c089ad1c0baae3782f645b95f7deeb/openmct/styles): Dentro de esta de carpeta se deben guardar todas las clases de den estilos al la visual

#### Levantar el Projecto

Una vez clonado el projecto debemos hacer lo siguiente.

```terminal
npm install
npm start
```

#### Importar plugin

el plugin se debe importar desde la carpeta /plugins y ejecutar la funcion  principal del archivo

##### Recursos utiles

Repositorio de [OpenMCT](https://github.com/nasa/openmct/blob/master/API.md)