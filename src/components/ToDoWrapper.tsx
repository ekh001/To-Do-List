// import React from 'react'
import { useState } from "react";

import ToDoForm from "./ToDoForm";

import { v4 as uuidv4 } from 'uuid';
import ToDo from "./ToDo";
uuidv4();


interface Todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

const ToDoWrapper = () => {

  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (todo: string) => {
    setTodos([...todos, 
      {id: uuidv4(), task: todo,
    completed: false, isEditing: false}
  ]);
  console.log(todos)
  }

  
  return (
    <div className="TodoWrapper">
      <h1 className="
      "
      >
        Let's Get it Done!
      </h1>
      <ToDoForm addTodo={addTodo}/>
      {todos.map((todo, index) => (
        <ToDo task={todo} key={index} />

      ))}
      
    </div>
  )
}

export default ToDoWrapper;
