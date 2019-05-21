<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
  Backend API for Room-Management built with 
  <a href="http://nestjs.com" target="blank">NestJS</a>
</p>

## Installation
```bash
$ npm install
```

## Configure database access
You can configure your local database access in `./ormconfig.json`
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "room_management",
  "entities": ["src/**/**.entity{.ts,.js}"],
  "synchronize": true
}
```

## Running the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Build the application
```bash
$ npm run build
```
You will find the build artifacts in the `./dist` directory.


## Open Api
After starting the application, you can investigate the API on <http://localhost:3000/swagger>
