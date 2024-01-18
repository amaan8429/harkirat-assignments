//generics are basically templates
function getFirstElement<T>(arr: T[]) {
  return arr[0];
}

// let ans1 = getFirstElement<number>([0, 1, 1]);
// let ans2 = getFirstElement<string>(["app", "website"]);

//generic  function which returns a generatic array of two things swapped
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

let ans4 = swap<number>(1, 3);
let ans5 = swap<string>("1", "2");
console.log(ans4);

//function takes two args with diff data types and returns swapped array of the two
function swap2<T, S>(a: S, b: T): [T, S] {
  return [b, a];
}

let ans6 = swap2(1, "e");
console.log(ans6);
