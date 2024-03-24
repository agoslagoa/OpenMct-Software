# Software de Control Autónomo de Embarcaciones de la Universidad de San Andrés

## Levantar el projecto 
 para iniciar el projecto se recomibenda levantarlo de forma local utlizando Node Js Y Ros 2 Humble. Como sistema opertaivo se enfatiza el uso de Linux Ubuntu ya que facilitara su uso o desarrollo 

 Node Js: https://nodejs.org/en
 
 Ros 2: https://docs.ros.org/en/humble

 Apesar de esto se esta de desarrollando una alternativa con Docker 
    Debe Ejecutar los sigueintes comandos:
 ``` 
    docker build -t Nautilus .
```

Cuando Finalize debe ejecutar:

```
    docker run -p 8080:8080 Nautilus
```