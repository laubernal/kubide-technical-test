# Kubide technical test

## Pasos para levantar la aplicación

> **El .env está en el repositorio para facilitaros la vida y que no tengáis que crearlo.**

Clonar el repositorio de GitHub

```
git clone https://github.com/laubernal/kubide-technical-test.git
```

Ejecutar el docker compose

```
cd ./server
npm run docker:up
```

La aplicación se levantará en el puerto 5000 y con la colección de Postman  ya puedes empezar a usarla.

> La colección de Postman está como json en la raíz del repositorio *KubideTechnicalTest.postman_collection.json*

> Tener en cuenta que hay dos variables de colección en la colección de Postman *userId* y *bearerToken*. La de *bearerToken* se setea sola al hacer un Sign in, pero la de *userId* hay que setearla manualmente!

La documentación de Swagger está disponible en el siguiente enlace una vez esté levantada la aplicación: `http://localhost:5000/api`

## Decisiones técnicas

### ¿Cómo he enfocado la prueba?

Lo primero que he hecho al recibir la prueba es leerla atentamente y a partir de las historias de usuario las he desgranado en pequeñas tareas. A nivel de arquitectura de la aplicación he decidido hacer una arquitectura hexagonal simplificada, respetando siempre la separación entre las capas evitando así tener leaks de infraestructura. A continuación explicaré las concesiones que más pueden llamar la atención:

- Entidades de dominio anémicas, prácticamente no tienen métodos de dominio son como DTOs.
- Lo que los casos de uso reciben es básicamente la request ya que no quería invertir tiempo en transformar la request en otro DTO.
- No hay value objects, me he apoyado en las validaciones que ofrece NestJS con su paquete de _class-validator_
- No he hecho ningún evento de dominio a pesar de que el caso de uso de _SendMessage_ es un buen candidato para hacer uso de ellos.

### Otras decisiones a destacar

#### ¿Por qué identificadores desde fuera?

- Es más eficiente que generarlo en la base de datos
- Mantenemos las mutaciones de estado sin ningún retorno
- Simplicidad del uso de la api por parte de los clientes

#### ¿Por qué gestionar los errores en el controlador?

- Granularidad a la hora de controlar los errores de cada caso de uso
- Mapeo de los errores de dominio a los códigos de HTTP
- Alternativa: usar los interceptors de NestJS

#### ¿Por qué no hay relaciones en la definición de los modelos de TypeORM?

- Simplicidad, no se especificaba la necesidad de hacer joins entre diferentes tablas en ningún caso de uso

#### Aclaraciones/Intepretaciones de alguna funcionalidad

- Caso de uso de _SendMessage_: he interpretado que no se puede enviar un mensaje cuando el usuario no está activo, por lo tanto ni guardo este mensaje ni guardo la notificación.

### Mejoras

- Implementar tests, no pedía en la prueba por eso no he realizado ninguno.
