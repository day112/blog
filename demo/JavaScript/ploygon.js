
function Ploygon (sides) {
  console.trace()
  if (this instanceof Ploygon) {
    this.sides = sides
    this.getArea = function () {
      return 0
    }
  } else {
    return new Ploygon(sides)
  }
}

function Rectangle (width, height, sides) {
  if (this instanceof Rectangle) {
    Ploygon.call(this, sides)
    this.width = width
    this.height = height
  } else {
    return new Rectangle(width, height, sides)
  }
}

Rectangle.prototype = new Ploygon()

const rect = Rectangle(100, 100, 2);

console.log(rect.sides)
console.warn(rect.width)
console.log(window.sides)
