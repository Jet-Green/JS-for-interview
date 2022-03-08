// Для получения прототипа, который наследуется от родительского класса используется конструкция __proto__ с ES, а раньше было Object.getPrototypeOf()
//

function Cat(name, color) {
    this.name = name;
    this.color = color
}

Cat.prototype.voice = function () {
    console.log('Cat ' + this.name + ' says meow')
}

const cat = new Cat('Kat', 'white')

cat.voice()

// ========

function Person() { }
Person.prototype.legs = 2

const person = new Person()

person.name = 'Grisha'
// проверяет наличие свойства в прототипе
console.log('legs' in person)
// Не в прототипе, то есть своё свойство
console.log(person.hasOwnProperty('legs'))

// =======
const proto = { year: 2022 }
const myYear = Object.create(proto)

console.log(myYear.year)
proto.year = 2222
console.log(myYear.year)