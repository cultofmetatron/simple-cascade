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

var identity = function(fn) {
  return function() {
    return fn.apply(this, arguments);
  };
};

var cascade = function(fns) {
  fns = Array.prototype.slice.call(arguments);
  var fns_l = fns.length;
  //mark the tail
  fns[fns_l-1] = identity(fns[fns_l-1]);
  fns[fns_l-1].tail = true;
  return function(args, next_) {
    var ctx = this;
    args = Array.prototype.slice.call(arguments);
    var args_l = args.length;
    next_ = identity(args.pop());
    next_.isNext = true;

    //iterate backwards through fns, replacing each one with a 
    //version curried with the one before it.
    var _i
    var next;
    var next__;
    var curries = [];
    var args_w
    for(_i = fns_l - 1; _i >= 0; _i--) {
      if (_i === (fns_l - 1)) {
        //next = bind(next_, ctx, args);
        //this is the last one to pass along the original _next
        next = (function(i__) {
          return function() {
            var next_args = Array.prototype.slice.call(arguments);
            console.log('end:', next_args, i__, fns_l)
            if (fns[i__].tail) {
              console.log('tails', i__);
            } else {
              console.log('heads');
            }
            return bind(next_, ctx, args)();
          };
        }).call(ctx, _i)
        
        args_w = args.slice();
        args_w.push(next);
        //pushes to the front of the list
        next__ = bind(fns[_i], ctx, args_w)
        next__.next_ = true;
        curries.unshift(next__);

      } else {
        //next = curries[0];
        next = (function(currytime, i__) {
          return function() {
            var next_args = Array.prototype.slice.call(arguments);
            //console.log('next args', next_args);
            if ((next_args.length === 0 ) ) {
              console.log('inline1', i__ , 'args0', fns_l)
              return currytime.call(ctx);
            } else  if (currytime.next_){
              console.log('inline1', i__ , next_args, fns_l)
              return currytime.call(ctx);
            } else {
              console.log('inline2', i__ , next_args, fns_l);
              return currytime.call(ctx);
            }
          }
        }).call(ctx, curries[0], _i);//this is important to crystalize the current value of curries[0]
        args_w = args.slice();
        args_w.push(next);
        //pushes to the front of the list
        curries.unshift(bind(fns[_i], ctx, args_w));
      }
      /*
      args_w = args.slice();
      args_w.push(next);
      //pushes to the front of the list
      curries.unshift(bind(fns[_i], ctx, args_w));
      */
    }
    return curries[0]();
  }
};


module.exports = cascade;

