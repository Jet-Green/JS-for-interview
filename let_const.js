let a = 'Var a'
let b = 'Var b'

// Создание нового Scope
{
    a = 'new a'
    let b = 'local var b'

    console.log('A in new Scope: ', a)
    console.log('B in new Scope: ', b)
}

console.log(a)
console.log(b)
// console.log('CONST begin')
//
// const array = ['js', 'is', 'good']
// array.push('123') // - можно так делать, потому что ссылка не меняется, изменяем только внутреннее состояние объекта