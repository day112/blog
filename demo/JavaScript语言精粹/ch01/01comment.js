/*
var a = 1 //
 */

// // //
function add (a, b) {
  var s = Array.from(arguments)
  console.log(s)
  return a + b
}

console.log(add.apply(null, [5, 3]))
