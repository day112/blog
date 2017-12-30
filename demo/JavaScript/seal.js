
var nico = {
  name: "nico",
  say: function () {
    console.log(this.name)
  }
}

Object.seal(nico)
// nico.age = 16

nico.say = function (){
  console.log('my name is ' + this.name)
}

function deepFrozen (obj) {
  var props = Object.getOwnPropertyNames(obj)

  props.forEach(function (name) {
    var prop = obj[name]
    if (typeof prop === 'object' && prop !== null) {
      deepFrozen(prop)
    }
  })

  return Object.freeze(obj)
}
