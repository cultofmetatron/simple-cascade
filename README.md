simple-cascade
==============

A basic utility function for composing cascade flows between functions

Do you like the control flow scheme in express? well I made a simple utility function that allows you to
generate control flow in a similar way.

I made it nestable too so you can nest a function returned from cascade into another cascade sequence!


###Usage

```javascript
  var cascade = require('simple-cascade');

  //cascade returns a function so you can defer evaluation
  var flow = cascade(function(variable, next) {
    variable.foo = 'baz';
    next()
  }, function(variable, next) {
    console.log(variable.foo) // => 'baz'
    next()
  })({ foo: 'bar' }, function() {
    console.log('this gets called last')
    
  })


```

###TODOS

* Impliment basic error handling
* write more tests!?


