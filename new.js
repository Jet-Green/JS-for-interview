function Cat(color, name) {
    this.color = color
    this.name = name
}
// нативная реализация в ES5
function myNew(constructor, ...args) {
    const obj = {}
    Object.setPrototypeOf(obj, constructor.prototype)

    return constructor.apply(obj, args) || obj
}

const cat = myNew(Cat, 'black', 'CAT')

console.log(cat);