function add (a) {
  return Array.prototype.push.call(arguments, a)
}

console.log(add(1))
