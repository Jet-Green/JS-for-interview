# Code examples for better understanding js basics
## Типы данных
#### Существует 6 типов данных:  
  1. `null` и `undefined`
  2. `boolean`
  3. `number`
  4. `string`
  5. `object`(только он не примитивный)
  6. `symbol`(с ES6)
#### Выражение `typeof function(){}` возвращает `function`, хоть такого типа не существует. Это сделано для упрощения разработки, так как функция является объектом
#### К `false` приводятся:
  1. Пустые кавычки(`''`, `""`)
  2. `null`
  3. `undefined`
  4. `NaN`
  5. `false`
#### ` + ` со строками приводит результат к строке, но при умножении строк получается число, так как эта операция не определена для строк. Также происходит для других операций
#### В результате выполнения кода снизу переменная `a` будет 12, а переменная `b` 13, так как мы просто сделали копию значения переменной `a` в переменную `b`
```js
let a = 12;
b = a;
b++;
```
#### Если использовать ссылочные типы данных, таких как массивы, объекты, то есть не примитивные, то значение будет меняться в обоих массивах
```js
let a = [1, 2, 3]
b = a;

b.push(4)
```
В итоге оба массива будут `[1, 2, 3, 4]`
## *Scope*
#### Об областях видимости в JS нужно знать только то, что, если переменная объявлена уровнем выше, то она доступна в данной области видимости
```js
function parent() {
    let a = 123;
    function childrenA() {
        let b = 1234;
        function childrenB() {
            let c = 12345;
        }
    }
}
```
#### То есть, в функции `childrenA` мы имеем доступ к переменной `a`, но не имеем доступа к переменной `c`
#### В функции `childrenB` мы имеем доступ ко всем переменным: `a`, `b`, `c`
#### Можно создавать новый *Scope* с помощью особого синтаксиса
```js
let a = 'Var a'
let b = 'Var b'

// Создание нового Scope с помощью {}
{
    a = 'new a'
    let b = 'local var b'

    console.log('A in new Scope: ', a)
    console.log('B in new Scope: ', b)
}

console.log(a)
console.log(b)
```
#### В консоль будет выведено
```
A in new Scope:  new a
B in new Scope:  local var b
new a
Var b
```
#### Первый log происходит из нового *Scope*, поэтому выводится перезаписанная переменная `a`(она будет `new a`), к которой мы имеем доступ, так как находимся уровнем ниже. 
#### Далее мы задаём переменную `b`, к которой мы не будем иметь доступа в родительской области видимости, поэтому 4 log выводит `Var b`. 
#### 3 log выводит её новое значение `new a`, так как мы поменяли значение переменной `a` в новом *Scope*. 
## `let` `const` `var` и понятие *hoisting*
#### *hoisting* позволяет получить доступ к переменной до её инициализации
#### `var` подвергается *hoisting*, а `let` и `const` - нет.
#### При этом значение переменной, полученной до инициализации будет `undefined`. То есть, мы можем сделать так:
```js
console.log(a);
var a = 123;
```
#### Но в консоль будет выведено значение `undefined`. А с `let` и `const` вообще будет ошибка.
#### Существует 2 способа объявления функции: *Function Declaration*, *Function Expression*
#### *Function Declaration*
```js
let sum = function(a, b) {
    return a + b;
}
```
#### *Function Expression*
```js
function sum(a, b) {
    return a + b;
}
```
#### Их различие в том, что при *Function Declaration* можно использовать *hoisting*, поменяв `let` на `var`, но при этом вы не сможете вызвать эту функцию(будет вылазить ошибка, так как значение этой переменной ещё не присвоено). 
#### Используя *Function Expression*, доступ к функции есть везде.
## *Closures(Замыкания)*
#### По сути мы возвращаем функцию из функции
```js
function sayHelloTo(name) {
    const m = 'Hello ' + name;
    
    return function() { console.log(m) } // Это и есть замыкание
}

const helloToElena = sayHelloTo('Elena')

helloToElena()
```
#### Результатом работы `helloToElena` будет `Hello Elena`
#### Вся их суть в том, что возвращаемая функция имеет доступ к *Scope* родительской

## *IIFE(Immediate Invoked Function Expression)*
#### *IIFE* - функция, которая будет вызвана немедленно
#### В первых скобках - функция, которая будет вызвана немедленно и она принимает аргументы, переданные во вторые скобки:
```js
(function(args) {})(args)
```
#### Рассмотрим фрагмент кода
```js
const fib = [1, 1, 2, 3, 5, 8, 13]

for (var i = 0; i < fib.length; i++) {
    setTimeout(function () {
        console.log(`fib[${i}] = ${fib[i]}`)
    }, 1000)
}
```
#### В консоль будет выведено
```
fib[7] = undefined
fib[7] = undefined
fib[7] = undefined
fib[7] = undefined
fib[7] = undefined
fib[7] = undefined
fib[7] = undefined
```
#### Это происходит потому что с помощью `var` мы создаём только одну переменную, которая будет меняться в цикле, а у нас стоит `setTimeout` на 1 секунду, поэтому после завершения работы цикла, которое будет намного быстрее 1 секунды, переменная `i` стала равна `7` и в консоль вывелось это чудо.  
#### Эту проблему можно решить двумя способами: просто заменить `var` на `let` или использовать *IIFE*
#### На собеседовании скорее всего это спросят, поэтому решение:
```js
const fib = [1, 1, 2, 3, 5, 8, 13]

for (var i = 0; i < fib.length; i++) {
    (function (j) {
        setTimeout(function () {
            // Тут уже используем локальную копию значения переменной i
            console.log('fib[' + j + ']' + ' = ' + fib[j])
        }, 1000)
    })(i) // Эту переменную мы передаём в функцию
}
```
#### На собеседовании часто спрашивают эту проблему:
```js
for (var i = 0; i < 5; i++) {
    result.push(function () {
        console.log(i)
    })
}
result[1]()
result[2]()
```
#### В консоль будет выведено
```
5
5
```
#### Это происходит, так как с помощью `var` мы создаём только одну переменную, которая потом хранится в памяти и на `console.log()` после завершения цикла, она равна `5`.
#### С `let` или `const` такой проблемы нет
#### Эту проблему решает *IIFE*, которая, по сути, копирует значение переменной `i` на каждой итерации в *Scope* функции, которую мы добавляем в массив

#### Решение проблемы:
```js
for (var i = 0; i < 5; i++) {
    (function () {
        // копируем примитивное значение i в функцию, которая будет вызвана немедленно
        var j = i;
        result.push(function () { console.log(j); })
    })
    // Во вторые скобки передаются переменные, которые принимает функция в первых скобках
    ()
}
```
#### То есть, на каждой итерации мы просто копировали значение `i` в область видимости создаваемой функции
#### Таким образом, *IIFE* используется для создания локального *Scope*

## Контекст выполнения `this` и методы `call` `bind` `apply`
#### Рассмотрим фрагмент кода:
```js
const person = {
    surname: 'Markson',
    knows: function (what, name) {
        console.log(`You knows ${what}, ${name} ${this.surname}`)
    }
}

person.knows('all', 'Mark')
```
#### В консоль будет выведено
```
You knows all Mark Markson
```
#### Функция `knows` создаёт свой контекст, но она находится уже в контексте объекта `person`, поэтому имеет доступ к его переменным
#### С помощью функций `call`, `bind` и `apply` мы можем менять контекст вызова функции
#### Синтаксис:
```js
const someObj = {
    v: 123,
    someFunc: function () {
        return v;
    }
}

someObj.someFunc.call(context, arg1, arg2, arg3)
someObj.someFunc.apply(context, arrayOfArgs)
someObj.someFunc.bind(context, arg1, arg2, arg3)()
```
#### Первым аргументом всегда передаётся новый контекст выполнения
#### `call` отличается от `apply` тем, что аргументы передаются через запятую, а в `apply` массивом. 
#### `bind` отличается от них тем, что возвращает функцию, а они вызывают её
#### Создадим новый объект `john` с полем `surname`, чтобы использовать это поле при изменении контекста
```js
const john = {
    surname: 'Johnson'
}
```
#### Таким образом, мы можем использовать методы `call`, `bind` и `apply`:
```js
person.knows('all', 'Mark')

person.knows.call(john, 'nothing', 'John')
person.knows.apply(john, ['nothing', 'John'])
person.knows.bind(john, 'nothing', 'John')()
```
#### В консоль будет выведено
```
You knows all, Mark Markson
You knows nothing, John Johnson
You knows nothing, John Johnson
You knows nothing, John Johnson
```
#### То есть, здесь мы просто меняли контекст выполнения функции `knows`
#### В JS есть возможность создавать объекты из функций, подобно тому, как это обычно делается из классов, потому что функция имеет свой контекст, как и класс с объектами.
```js
function Person(name, age) {
    this.name = 'name';
    this.age = 'age';

    console.log(this);
}

const elena = new Person('Elena', 20)
```
#### Существует 2 типа передачи контекста: *явный* и *неявный*
#### Явный:
```js
function logThis() {
    console.log(this);
}

const obj = { age: 12 }

logThis.apply(obj)
logThis.call(obj)
logThis.bind(obj)()
```
#### Мы прямым образом передаём контекст выполнения
#### Неявный:
```js
const animal = {
    legs: 4,
    logThis: function () {
        console.log(this);
    }
}

animal.logThis()
```
#### Неявная передача, так как выводится контекст той функции(объекта), в которой был вызван этот метод
#### Также можно использовать много всего, например *IIFE*
```js
function Cat(color) {
    this.color = color
    console.log('this:', this);
    // тут используется стрелочная функция вместо обычной
    (() => console.log('this in arrow func:', this))()
}

new Cat('red')
```
#### В консоль будет выведено
```
this: cat { color: 'red' }
this in arrow func: cat { color: 'red' }
```

## Операторы *Rest* и *Spread*
#### Оператор *Spread* разворачивает массив. Его синтаксис - `...arr`
```js
function sum(a, b, c) {
    return a + b + c;
}

const arr = [1, 2, 3]

console.log(sum(...arr));
```
#### В консоль будет выведено
```
6
```
#### Оператор *Rest* позволяет получать неограниченное количество аргументов в функцию, его синтаксис тот же, что и у *Spread*
```js
function personsQualities(name, surname, ...qualities) {
    return name + ' ' + surname + "'s " + 'qualities: ' + qualities
}

console.log(personsQualities('John', 'Johnson', 'kind', 'hardworking'))
```
#### В консоль будет выведено
```
John Johnson's qualities: kind,hardworking
```
## Оператор `new`
#### Могут спросить также механизм работы оператора `new`
```js
function Cat(color, name) {
    this.color = color
    this.name = name
}
// нативная реализация в ES5
function myNew(constructor, ...args) {
    // Тут мы создаём объект, который необходимо вернуть
    const obj = {}
    // Ставим нужный прототип, который содержит методы класса
    Object.setPrototypeOf(obj, constructor.prototype)
    // Меняем контекст выполнения функции Cat
    return constructor.apply(obj, args) || obj
}

const cat = myNew(Cat, 'black', 'CAT')

console.log(cat);
```
#### Происходит всё то же самое, что и при использовании `new`
