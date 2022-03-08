const person = {
    surname: 'Persons',
    knows: function (what, name) {
        // function knows создаёт свой контекст, но она находится уже в контексте объекта person, поэтому имеет доступ к его переменным
        console.log(`You knows ${what}, ${name} ${this.surname}`)
    }
}

const john = {
    surname: 'Johnson'
}

// person.knows('all', 'Person')
// // Первый параметр - изменённый контекст(this)
// person.knows.call(john, 'nothing', 'John')
// // Отличается от call только тем, что имеет всего два параметра, второй - массив аргументов для функции
// person.knows.apply(john, ['nothing', 'John'])
// // bind возвращает функцию, а в целом остальное - то же самое, что у call и apply
// person.knows.bind(john, 'nothing', 'John')()

// функция - это объект
function Person(name, age) {
    this.name = name;
    this.age = age;

    console.log(this);
}

const elena = new Person('Elena', 20)


function logThis() {
    console.log(this);
}

// Явная передача контекста(биндинг)
const obj = { age: 12 }
// logThis.apply(obj)
// logThis.call(obj)
// logThis.bind(obj)()

// Неявная передача, так как выводится контекст той функции(объекта), в которой был вызван этот метод
const animal = {
    legs: 4,
    logThis: function () {
        console.log(this);
    }
}
// animal.logThis()

function Cat(color) {
    this.color = color
    console.log('this', this);
    (() => console.log('this in arrow func: ', this))()
}

new Cat('red')
