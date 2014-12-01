process.stdout = {};

var fax = require('fax');
require('setimmediate');

var app = fax();

app.use(function *(next) {
  this.url = 'http://localhost:8080';
  this.method = 'GET';

  yield next;

  console.log(this);
});

app.send();
