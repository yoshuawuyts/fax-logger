/**
* Module dependencies.
*/

var Counter = require('passthrough-counter');
var humanize = require('humanize-number');
var bytes = require('bytes');

/**
* Expose logger.
*/

module.exports = dev;

/**
 * Color map.
 */
//
// var colors = {
//   5: 31,
//   4: 33,
//   3: 36,
//   2: 32,
//   1: 32
// };

var colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Development logger.
 */

function dev(opts) {
  return function *logger(next) {
    // request
    var isErr = false;
    var start = new Date;
    console.log('  --> %s %s', this.method, this.url);

    try {
      yield next;
    } catch (err) {
      // log uncaught downstream errors
      log(this, start, null, err);
      isErr = true;
      throw err;
    }

    // calculate the length of a streaming response
    // by intercepting the stream with a counter.
    // only necessary if a content-length header is currently not set.
    var length = this.responseLength;
    var body = this.body;
    var counter = null;
    if (null == length && body && body.readable) {
      this.body = body
        .pipe(counter = Counter())
        .on('error', this.onerror);
    }

    // log when the response is finished or closed,
    // whichever happens first.
    var ctx = this;
    var res = this.res;

    var ln = counter ? counter.length : length;
    var eType = isErr ? 'close' : 'finish';
    log(ctx, start, ln, null, eType);
  }
}

/**
 * Log helper.
 */

function log(ctx, start, len, err, event) {
  // get the status code of the response
  var status = err
    ? (err.status || '')
    : (ctx.status || '');

  // set the color of the status code;
  var s = status / 100 | 0;
  var c = colors[s];

  // get the human readable response length
  var length;
  if (~[204, 205, 304].indexOf(status)) {
    length = '';
  } else if (null == len) {
    length = '-';
  } else {
    length = bytes(len);
  }

  var upstream = err
    ? 'xxx'
    : event === 'close'
    ? '-x-'
    : '<--';

  console.log('  ' + upstream + ' %s %s %s %s %s',
    ctx.method,
    ctx.originalUrl,
    status,
    time(start),
    length
  );
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
  var delta = new Date - start;
  delta = delta < 10000
    ? delta + 'ms'
    : Math.round(delta / 1000) + 's';
  return humanize(delta);
}

/**
* Currently only WebKit-based Web Inspectors, Firefox >= v31,
* and the Firebug extension (any Firefox version) are known
* to support "%c" CSS customizations.
*/

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  (window.console && (console.firebug || (console.exception && console.table))) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}
