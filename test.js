
var accepts = require('./');
var http = require('http');
var IncomingMessage = http.IncomingMessage;

describe('accept-encoding', function () {
  it('should handle an array of encodings', function () {
    accepts([ 'gzip', 'deflate', 'blah' ], 'blah').should.be.true;
    accepts([ 'gzip', 'deflate', 'blah' ], 'deflate').should.be.true;
    accepts([ 'gzip', 'deflate', 'blah' ], 'gzip').should.be.true;
    accepts([], 'gzip').should.be.false;
    accepts([ 'foo' ], 'gzip').should.be.false;
  });

  it('should handle an http.IncomingMessage', function () {
    var req = new IncomingMessage;
    req.headers['accept-encoding'] = 'gzip,deflate,sdch';
    accepts(req, 'gzip').should.be.true;
    accepts(req, 'blah').should.be.false;
    accepts(req, 'sdch').should.be.true;
    delete req.headers['accept-encoding'];
    accepts(req, 'gzip').should.be.false;
  });

  describe('.encodings', function () {
    it('should return the req\'s accepted encodings', function () {
      var req = new IncomingMessage;
      req.headers['accept-encoding'] = 'gzip,deflate,sdch';
      accepts.encodings(req).should.be.eql([ 'gzip', 'deflate', 'sdch' ]);
      delete req.headers['accept-encoding'];
      accepts.encodings(req).should.be.eql([]);
    });
  });
});
