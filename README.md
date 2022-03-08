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