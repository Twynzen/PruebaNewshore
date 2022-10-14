# Para ejecutar el proyecto acceda a esta url:
https://twynzen.github.io/PruebaNewshore/

# División del proyecto
Esta dividido en 3 carpetas principales
1. Interfaces
> Donde tenemos algunas plantillas de datos
2. Modules
> Donde tenemos los componentes principales a usar
3. Services
> Donde tenemos la lógica que realiza las peticiones http

# Comentarios varios 
* No fue necesario utilizar más que un componente/clase para realizar la prueba, la lógica principal está en el componente flight
* La función encargada de obtener los datos en el componente es muy extensa y es necesario dividirla de una forma más organizada, pues debería ser más que una sola función. 

```js 
 getFlights()
```
* La lógica en cuanto las escalas requiere de más pruebas para encontrar posibles fallos, además esta en desorden la forma en que se muestran al realizar la consulta

# Detalles a revisar por falta de tiempo, no dispuse de las 72 horas exactas suministradas para realizar la prueba
* Es necesario aplicar pruebas unitarias
* Es necesario aplicar interceptores
* No se realizó el problema 4 de cambio de moneda
* Es necesario aplicar aplicaron estilos
* Es necesario aplicar ordenamiento de funciones y buenas practicas, el código fue con algo de afán, por temas responsabilidades externas a la prueba y necesita una revisión de clean code
