interface Parents {
  mother: string;
  father: string;
}

//this is using the old interface as subinterace in this interface
interface PersonInterface4 {
  name: string;
  age: number;
  parents: Parents;
}

//this is same as above example
interface PersonInterface4 {
  name: string;
  age: number;
  parents: {
    mother: string;
    father: string;
  };
}

//this is extending a interface
interface PersonInterface2 extends Parents {
  name: string;
  age: string;
}

//this is same as the above interface with extends .
interface PersonInterface2 {
  name: string;
  age: string;
  mother: string;
  father: string;
}
