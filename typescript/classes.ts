//this is an interface
interface PersonInterface {
  name: string;
  age: number;
}

//this is class
class Person implements PersonInterface {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "hello mr" + this.name + "you are" + this.age + "years old";
  }
}

//creating a new object
const personObj = new Person("amaan", 14);
console.log(personObj.greet());
