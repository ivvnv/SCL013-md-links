# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Documentación técnica](#3-documentación-técnica)
* [4. Planificación](#4-planificación)
* [5. Checklist](#5-checklist)

***

![Logo](http://imgfz.com/i/BmpeZfH.png)
## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Resumen del proyecto

Md-links es un librería que es ejecutada en la terminal, en donde podemos ver los links de un archivo .md,
con opción de ver el estado http de cada url y sus estadisticas.

## 3. Documentación técnica

### Requerimientos
Tener instalado:
- node.js
- Npm

### Instalación
`$ npm i @ivvnv/md-links`

### Uso

**Inserta en tu código**

`const mdLinks = require('@ivvnv/md-links')`

**En la terminal ingresa**

`node archivoQueLlamaMdLinks.js archivoMdALeer.md [options]`

### Opciones
`--validate` Arrojará una lista con los links y su status.

`--stats` Esta opción arroja las estadísticas básicas de los links.

`--validate --stats` Permitirá ejecutar ambas opciones.
___

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente manera a través de la terminal:

`node archivoQueLlamaMdLinks.js archivoMdALeer.md [options]`

Por ejemplo:

```sh
$ node index.js ./some/example.md
 http://algo.com/2/3/ Link a algo
 https://otra-cosa.net/algun-doc.html algún doc
 http://google.com/ Google
```

#### Options

##### `--validate  |  --v`

Si pasas la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideramos el link como ok.

Por ejemplo:

```sh
$ node index.js ./some/example.md
 --validate
 http://algo.com/2/3/ ok 200 Link a algo
 https://otra-cosa.net/algun-doc.html fail 404 algún doc
 http://google.com/ ok 301 Google
```


##### `--stats  |  --s`

Si pasas la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ node index.js ./some/example.md --stats
Total: 3

```

## 4. Planificación

Nuestra planificación fue en Trello y Miró, haciendo en esta última un product backlog y un spring backlog para un mayor orden a la hora de ir desarrollando el programa; también se crearon flujos por cada realease del product backlog que en conjuntos hacen las historias de usuario y el flujo de trabajo.

![Trello](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/Trello.png)
![Miró general](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/miro-general.png)
![Release 1-2](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/release%201-2.png)

#### Flujogramas

![Release 3](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/release%203.png)
![Release 4](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/release%204.png)
![Release 5](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/release%205.png)
![Release 6](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/release%206.png)

#### Product Backlog

![Product Backlog 1](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/Product%20backlog%201.png)
![Product Backlog 2](https://raw.githubusercontent.com/ivvnv/SCL013-md-links/master/img%20readme/Product%20backlog%202.png)


## 5. Checklist

### General

* [X] Puede instalarse via `npm install --global <github-user>/md-links`

* [X] Uso de condicionales (if-else | switch | operador ternario)
* [X] Uso de funciones (parámetros | argumentos | valor de retorno)
* [X] Manipular arrays (filter | map | sort | reduce)
* [ ] Manipular objects (key | value)
* [X] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))
* [X] [Uso de callbacks.](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [X] [Consumo de Promesas.](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [X] [Creación de Promesas.](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)

### Node

* [X] Uso de sistema de archivos. ([fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html))
* [X] Instalar y usar módulos. ([npm](https://www.npmjs.com/))
* [ ] Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)
* [X] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)
* [ ] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)
* [X] Uso de CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing

* [X] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)
* [ ] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] Uso de Mocks manuales.

### Estructura del código y guía de estilo

* [X] Organizar y dividir el código en módulos (Modularización)
* [X] Uso de identificadores descriptivos (Nomenclatura | Semántica)
* [X] Uso de linter (ESLINT)

### Git y GitHub

* [X] Uso de comandos de git (add | commit | pull | status | push)
* [X] Manejo de repositorios de GitHub (clone | fork | gh-pages)
* [X] Colaboración en Github (branches | pull requests | |tags)
* [ ] Organización en Github (projects | issues | labels | milestones)

### HTTP

* [X] Verbos HTTP ([http.get](https://nodejs.org/api/http.html#http_http_get_options_callback))

### Fundamentos de programación

* [ ] [Recursión.](https://www.youtube.com/watch?v=lPPgY3HLlhQ)

***
