//this is class
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.greet = function () {
        return "hello mr" + this.name + "you are" + this.age + "years old";
    };
    return Person;
}());
//creating a new object
var personObj = new Person("amaan", 14);
console.log(personObj.greet());
