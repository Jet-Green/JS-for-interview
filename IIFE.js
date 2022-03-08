// Immediate Invoked Function Expression
// Суть - можем создавать функции, которые будут моментально вызваны.
// Обычно используется для создания локального Scope

let result = []

// Это работает некорректно
for (let i = 0; i < 5; i++) {
    result.push(function () {
        console.log(i)
    })
}
result[1]() // -> 5
result[2]() // -> 5

for (var i = 0; i < 5; i++) {
    (function () {
        // копируем примитивное значение i в функцию, которая будет вызвана немедленно
        var j = i;
        result.push(function () { console.log(j); })
    })
        // Во вторые скобки передаётся переменная, которую принимает функция в первых скобках
        ()
}

// result[0](); // -> 0
// result[1](); // -> 1
