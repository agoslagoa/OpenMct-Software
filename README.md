# Software de Control Autónomo de Embarcaciones de la Universidad de San Andrés

## Introduccion:
En búsqueda de avances punteros en tecnología marítima, la Universidad de San Andrés presenta con orgullo su Software de Control Autónomo de Embarcaciones. Desarrollado por un equipo de investigadores y ingenieros dedicados, este software representa un gran avance en el ámbito de la navegación marítima autónoma.

### Funcionamiento
el Software funciona a traves de varios ejes principlaes, primero utiliza commo base OpenMCT  Link: https://nasa.github.io/openmct/ Sumado a esto utiliza distintos nodos de Ros2 HUmble NodeJs para crear servidores en tiempo real e historicos

### Desarrollo:
A la hora de desarrrollar hay algunas cosas que se deben en  tener en cuenta de como es funcionamiento dee la aplicacion
#### Distribucion de carpetas

/example-server: En esta carpeta es donde se va todo lo relacionado con el server side, ya sea websocket puerto,etc

/assets:  En Assets se huardo todo lo cosmetico para la pagina ya sean sonidos imagesnes gif o cualquier otro archivo adicional que no tenga otra fucnion que ser decorativo

/plugins:  Todos los plugins que se desarrollen de forma externa deben ser guardados en esta carpeta, cada plugin debe tenr una funcion principal que va a ser util para importarlo

/styles: Dentro de esta de carpeta se deben guardar todas las clases de den estilos al la visual

#### Levantar el Projecto

Una vez clonado el projecto debemos hacer lo siguiente.

```
npm install
npm start
```

#### Importar plugin 
el plugin se debe importar desde la carpeta /plugins y ejecutar la funcion  principal del archivo 

##### Recursos utiles

Repositorio OpenMCT: https://github.com/nasa/openmct/blob/master/API.md