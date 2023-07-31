// import React from 'react'
import { useState } from "react";

interface ToDoFormProps {
  addTodo: (todo: string) => void;
  editToDo: (id: string) => void;
}

const ToDoForm: React.FC<ToDoFormProps> = ({ addTodo }) => {

  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo(value);

    setValue("")
  }
  return (
    <div>
      <form action="" className="TodoForm"
      onSubmit={handleSubmit}
      >
        <input type="text" className="todo-input"
        value={value}
        placeholder='What is the task today?'
        onChange={(e) => setValue(e.target.value)} />
        <button type="submit" className="todo-btn"
        >
          Add Task
        </button>
        

      </form>
    </div>
  )
}

export default ToDoForm
