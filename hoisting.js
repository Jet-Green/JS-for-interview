console.log(sum);
// var подвергается hoisting, а let const не подвергаются
var sum = function(a, b) {
    return a+b;
}
// Мы имеем доступ к переменной до её инициализации, кроме const & let
// При Function Declaration функции можно использовать только после декларации, а при Function Expression везде