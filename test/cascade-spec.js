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
      console.log('fn1')
      next('stranger love');
    };

    var fn2 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      console.log('fn2')
      next('stranger danger');
    };

    var fn2_1 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      console.log('fn2_1');
      next('shiett');
    };

    var fn2_2 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      console.log('fn2_2');
      next('hello');
    };

    var fn3 = function(req, res, next) {
      req.should.equal(2);
      res.should.equal(3);
      console.log('fn3')
      next('deautchland')
    };

    cascade(fn1, fn2, cascade(cascade(fn2_1,fn2_1), fn2_2, cascade(fn2_1, fn2_2)) , fn3).call({ctx:'ctx'}, 2, 3, function(req, res) { 
      req.should.equal(2);
      res.should.equal(3);
      console.log('finally');
      done(); 
    });
  });

  xit('should let me attach an error handler', function(done) {
    var fn1 = function(req, res, next) {
      req.should.equal(2);
      res.should.equal(3);
      next(new Error('rololo'));
    };

    var fn2 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      next(new Error('sample error'));
    };

    fn2_onError = function(err, req, res, next) {
      err.message.should.equal('sample error')
    
    };

    var fn3 = function(req, res, next){
      req.should.equal(2);
      res.should.equal(3);
      next();
    };


    var flow = cascade(fn1, [fn2, fn2_onError], function(req, res) {
      req.should.equal(2);
      res.should.equal(3);
      done();
    });
    
      
  })


})
