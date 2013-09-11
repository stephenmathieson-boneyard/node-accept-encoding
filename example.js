var http = require('http');
var accepts = require('./');

http.createServer(function (req, res) {
  if (accepts(req, 'gzip')) {
    res.end('gzip');
  } else if (accepts(req, 'deflate')) {
    res.end('deflate');
  } else {
    res.end('get a better browser');
  }
}).listen(3005);
