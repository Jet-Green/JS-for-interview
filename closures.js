// function sayHelloTo(name) {
//     const m = 'Hello ' + name;
//
//     // Вся суть в том, что эта функция имеет доступ к scope её функции-родителя
//     return function() {
//         console.log(m)
//     }
// }
//
// const helloToElena = sayHelloTo('Elena')
//
// helloToElena()

// setTimeout
const fib = [1, 1, 2, 3, 5, 8, 13]

// Это не буде работать корректно, так как цикл проходит достаточно быстро
// (так как создаётся только одна переменная, которая под коней цикла становится равна fib.length),
// а у нас стоит setTimeout, который выполняется с i = 6
for (var i = 0; i < fib.length; i++) {
    setTimeout(function () {
        console.log(`fib[${i}] = ${fib[i]}`)
    }, 1000)
}
// Чинится. если использовать let i, а не var i. Если нельзя использовать let, то:
for (var i = 0; i < fib.length; i++) {
    (function (j) {
        setTimeout(function () {
            console.log(`fib[${j}] = ${fib[j]}`)
        }, 1000)
    })(i)
}