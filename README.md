# fax-logger
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Logger middleware for fax, based on [koa-logger][koa-logger].

## Installation
```bash
npm install fax-logger
```

## Usage
```js
var logger = require('fax-logger')
var fax = require('fax')

var app = fax()
app.use(logger())
```

## See also
- [koa-logger][koa-logger]

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/fax-logger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fax-logger
[travis-image]: https://img.shields.io/travis/yoshuawuyts/fax-logger.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/fax-logger
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/fax-logger.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/fax-logger?branch=master
[downloads-image]: http://img.shields.io/npm/dm/fax-logger.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/fax-logger

[koa-logger]: https://github.com/koajs/logger
