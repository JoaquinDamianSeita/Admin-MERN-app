# Admin-MERN-app

Aplicación para simplificar la adminstración de pequeños negocios y emprendimientos.

## Table of Contents

* [Background / Overview](#background--overview)
* [Features](#features)
* [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Structure / Scaffolding](#structure--scaffolding)
* [Documentation](#documentation)
* [Dependencies](#dependencies)
* [Todo](#todo)
* [Release History](#release-history)
* [Authors](#authors)
* [License](#License)




## Background / Overview

Una aplicacion web en desarrollo, la idea es facilitar la tarea de administrar datos como contactos, presupuestos, compras todo en un solo lugar donde la persona
pueda disponer de la informacion en cualquier momento en tiempo real.

## Features

* Lista de contactos
  * Agregar,Modificar y Borrar contactos.

## Prerequisites

You will need the following installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)

### Installation

Open your terminal and type in

```sh
# clonar el codigo desde la pagina
$ git clone https://github.com/JoaquinDamianSeita/Admin-MERN-app.git
# entrar al directorio creado
$ cd Admin-MERN-app
# instalar las dependencias necesarias para el proyecto en el server
$ npm i
# entrar al directorio client
$ cd client
# instalar las dependencias necesarias para el cliente
$ yarn install
```

### Structure / Scaffolding

```text
Admin-MERN-app
├── client
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── actions
│   │   │   └── index.js
│   │   ├── components
│   │   │   ├── contacts
│   │   │   │   ├── ContactAdd.js
│   │   │   │   ├── ContactEdit.js
│   │   │   │   ├── ContactInfo.js
│   │   │   │   └── ContactList.js
│   │   │   ├── orders
│   │   │   │   ├── OrderAdd.js
│   │   │   │   ├── OrderEdit.js
│   │   │   │   ├── OrderInfo.js
│   │   │   │   └── OrderList.js
│   │   │   └── pages
│   │   │       └── About.jsx
│   │   ├── reducers
│   │   │   ├── contactReducer.js
│   │   │   ├── contactsReducer.js
│   │   │   ├── index.js
│   │   │   ├── orderReducer.js
│   │   │   └── ordersReducer.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── serviceworker.js
│   │   └── setupTests.js
│   ├── package.json
│   └── yarn.lock
├── models
│   ├── contact.js
│   └── orden.js
├── routes
│   └── index.js
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Documentation

* Proximamente


## Dependencies

List of dependencies used in the project

* [React.js] - (https://es.reactjs.org/) - Una biblioteca de JavaScript para construir interfaces de usuario.
* [React - Bootstrap] (https://react-bootstrap.github.io/) - UI framework for modern web apps.
* [React - Redux] (https://react-redux.js.org/) - Official React bindings for Redux.
* [redux-logger] (https://www.npmjs.com/package/redux-logger) - LogRocket is a production Redux logging tool that lets you replay problems as if they happened in your own browser.
* [redux-thunk] (https://www.npmjs.com/package/redux-thunk) - Thunk middleware for Redux.
* [Node.js] (https://nodejs.org/es/) - Node.js® es un entorno de ejecución para JavaScript.
* [concurrently] (https://www.npmjs.com/package/concurrently) - Run multiple commands concurrently. Like npm run watch-js & npm run watch-less but better.
* [express] (https://expressjs.com/es/) - Infraestructura web rápida, minimalista y flexible para Node.js.
* [MongoDB] (https://www.mongodb.com/) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
* [mongoose-sequence] (https://www.npmjs.com/package/mongoose-sequence) - This plugin lets you create fields which autoincrement their value.



## Todo

List of things to fix or add

- [x] Improve README.md
- [ ] Add documentation
- [ ] Add Unit tests

## Release History

* 0.0.1 - Initial release
  * Ahora hay una lista de contactos funcional.


## Authors

* [**Joaquin Seita**](https://github.com/JoaquinDamianSeita)

## License

Copyright (c) 2021 Joaquin Seita
