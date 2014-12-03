process.stdout = {};

var logger = require('..');
var fax = require('fax');
require('setimmediate');

var app = fax();
app.use(logger());

app.send({url: 'http://api.github.com'});
