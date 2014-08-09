/*
 * cascade takes a function f1, f2, f3 etc,  and composes them such that 
 * f1 is passsed the args to f1 + a next which partiallly applies them to f2 and
 * so forth.
 */

//takes the arguments as a array instead of serially
var bind = function(fn, ctx, args) {
  return function(args2) {
    args2 = args.concat(Array.prototype.slice.call(arguments));
    return fn.apply(ctx, args2);
  };
};

var cascade = function(fns) {
  fns = Array.prototype.slice.call(arguments);
  var fns_l = fns.length;
  return function(args, next_) {
    args = Array.prototype.slice.call(arguments);
    var args_l = args.length;
    next_ = args.pop();

    //iterate backwards through fns, replacing each one with a 
    //version curried with the one before it.
    var _i
    var next;
    var curries = [];
    var args_w
    for(_i = fns_l - 1; _i >= 0; _i--) {
      if (_i === (fns_l - 1)) {
        next = bind(next_, this, args);
        args_w = args.slice();
        args_w.push(next);
        curries.unshift(bind(fns[_i], this, args_w));
      } else {
        next = curries[0];
        args_w = args.slice();
        args_w.push(next);
        curries.unshift(bind(fns[_i], this, args_w))
      }
    }
    return curries[0]();
  }
};


module.exports = cascade;

