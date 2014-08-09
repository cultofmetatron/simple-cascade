var mocha  = require('mocha');
var should = require('should');

describe('cascade', function() {

  var cascade = require('../lib/cascade');

  it('merges 2 functions together like a compose', function(done) {
    var fn1 = function(req, res, next) {
      req.should.equal(2);
      res.should.equal(3);
      next();
    };

    var fn2 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      next();
    };

    var fn3 = function(req, res, next) {
      req.should.equal(2);
      res.should.equal(3);
      next();
    };
  
    cascade(fn1, fn2, fn3)(2, 3, function(req, res, next) { 
      req.should.equal(2);
      res.should.equal(3);
      done();
    });
  });

  it('lets me nest cascades', function(done) {
    var fn1 = function(req, res, next) {
      req.should.equal(2);
      res.should.equal(3);
      next();
    };

    var fn2 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      next();
    };

    var fn2_1 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      next();
    };

    var fn2_2 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      next();
    };

    var fn3 = function(req, res, next) {
      req.should.equal(2);
      res.should.equal(3);
      next()
    };

    cascade(fn1, fn2, cascade(fn2_1, fn2_2) , fn3)(2, 3, function(req, res) { 
      req.should.equal(2);
      res.should.equal(3);
      done(); 
    });
  });




})
