enum Operation {
  Add, //value is 0
  Sub, //value is 1
  Mul, //value is 2
}

function Calcl3(a: number, b: number, type: Operation) {
  console.log(type); //it will log 0
  //body
}

let x = Calcl3(3, 4, Operation.Add);
console.log(x);
