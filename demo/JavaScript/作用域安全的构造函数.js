function Person (name, age, job) {
  if (this instanceof Person) {
    this.name = name
    this.age = age
    this.job = job
  } else {
    return new Person(name, age, job)
  }
}

const lisi = Person('lisi', 19, 'student')
// const zhangsan = new Person('zhangsan', 19, 'student')

// console.log(zhangsan.name)
// console.log(zhangsan.age)
// console.log(zhangsan.job)
console.log(window.name)
