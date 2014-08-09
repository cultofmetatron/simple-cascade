var mocha  = require('mocha');
var should = require('should');
var _ = require('lodash');

describe('cascade', function() {

  var cascade = require('../lib/cascade');

  it('merges 2 functions together like a compose', function(done) {
    var fn1 = function(req, res, next) {
      console.log(req, res, next)
      next();
    };

    var fn2 = function(req, res, next){
      console.log('fn2');
      next();
    };

    var fn3 = function(req, res, next) {
      console.log('fn3');
      req.should.equal(2);
      res.should.equal(3);
      console.log('yay', req, res);
      next();
    };
  
    cascade(fn1, fn2, fn3)(2, 3, function() { console.log('usp'); done(); });
  });

  it('lets me nest cascades', function(done) {
    console.log('nesting#####')
    var fn1 = function(req, res, next) {
      console.log(req, res, next)
      next();
    };

    var fn2 = function(req, res, next){
      console.log('fn2');
      next();
    };

    var fn2_1 = function(req, res, next){
      console.log('fn2_1');
      next();
    };

    var fn2_2 = function(req, res, next){
      console.log('fn2_2');
      next();
    };

    var fn3 = function(req, res, next) {
      console.log('fn3');
      req.should.equal(2);
      res.should.equal(3);
      console.log('yay', req, res);
      next()
    };

    cascade(fn1, fn2, cascade(fn2_1, fn2_2) , fn3)(2, 3, function() { console.log('usp'); done(); });
  });




})
