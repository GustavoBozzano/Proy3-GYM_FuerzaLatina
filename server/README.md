# Proyecto 3 -- GYM FUERZA LATINA

## TÍTULO

Aplicación para organizar internamente los entrenamientos en un gimnasio.

## DESCRIPCIÓN

APP que permite publicar ejercicios para la gestión de los mismos en un
gimnasio. Los usuarios serán los trabajadores del gimnasio.

### USUARIOS ANÓNIMOS

Pueden ver la landing de la plataforma donde podrán registrarse o hacer login.

### ADMINISTRADOR

- Será el único en poder añadir un nuevo ejercicio:

  - nombre
  - descripción
  - tipología
  - grupo muscular
  - equipamiento
  - foto

- Puede modificar o eliminar un entrenamiento

### USUARIO (NO ADMINISTRADOR)

- Puede ver el listado del los ejercicios y entrar en el detalle de los mismos.
- Podrá filtrarlos por algunas características (ej: tipología o grupo muscular).
- Podrá poner o quitar un like a un ejercicio.

## ENDPOINTS de USUARIO

- `POST: /users/register` (registro de usuario)
- `GET: /users/validate/:registrationCode` (validación de usuario)
- `POST: /users/login` (loguearse como usuario)
- `POST: /users/password/recover` (recuperación de contraseña de usuario)
- `PUT: /users/password` (actualización de contraseña de usuario)
- `GET: /users/:userId` (obtener el perfil público de un usuario)
- `GET: /users` (obtener el perfil privado del usuario logueado)
- `PUT: /users/update` (modificar el nombre de usuario logueado)

- Una vez creado los usuarios, el responsable de la BBDD asignará el rol `ADMINISTRADOR` manualmente dentro del Workbench.

## ENDPOINTS de EJERCICIOS

- `POST: /newExercises` (añadir un nuevo ejercicio, validando si el User es Admin)
- `PUT: /modifExercise/:exerciseId` (modificar un ejercicio, validando si el User es Admin)
- `DELETE: /deleteExercise/:exerciseId` (eliminar un ejercicio, validando si el User es Admin)
- `GET: /exercises` (visualizar todos los ejercicios)
- `GET: /exercises?query=params` (visualizar todos los ejercicios que cumplan la condición de búsqueda, según criterio)
- `GET: /exercise/:exerciseId` (visualizar un ejercicio según su ID)
- `POST: /exercises/like/:exerciseId` (darle LIKE a un ejercicio)
- `DELETE: /exercises/dislike/:exerciseId` (quitarle LIKE a un ejercicio)
- `GET: /listlikes` (enlistar todos los ejercicios favoritos que el usuario dió LIKE)
- `DELETE: /dislike/:exerciseId` (quitarle el LIKE a un ejercicio)

- ## Pasos para hacer la instalación

1|clonar el repositorio de GitHub.  
2|En el directorio Raíz: ejecutar `npm run install` para que se instalen todas las dependencias, tanto del Cliente como del Server.  
3|Dentro de Server: hacer una copia de .env.example y renombrarlo en .env (colocar las claves personales)  
4|En el directorio Raíz: ejecutar `npm run initDb` para crear la BBDD, sus tablas y el borrado de fotos anteriormente existentes.  
5|Importar la colección de Postman del repositorio para ejecutar las pruebas de los Endpoints con el Server, si fuera necesario.  
6|En el directorio Raíz: script para correr la aplicación: `npm run start`.

- ## Variables de entorno del backend: .env

_conexión a la base de datos_

`MYSQL_HOST=`

`MYSQL_USER=`

`MYSQL_PASSWORD=`

`MYSQL_DATABASE=`

_directorio para el guardado de imagenes_

`UPLOADS_DIR=`

_servidor de envío de mails_

`SMTP_HOST=`

`SMTP_PORT=`

`SMTP_USER=`

`SMTP_PASS=`

_palabra del Token_

`SECRET=`

_Puerto del servidor_

`PORT=`

_Direccion y puerto del Front_

`ACTIVATION_URL`

_Credenciales del servicio de Cloudinary (almacenado de imagenes)_

`CLOUDINARY_CLOUD_NAME`  
`CLOUDINARY_API_KEY`  
`CLOUDINARY_ACCES_KEY`
