interface Todo {
  name: string;
  description: string;
}

type MyTodo = Partial<Todo>;

//it can basically allow each thing to be undefined. just hover over MyTodo , you will get it
