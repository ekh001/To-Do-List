import { useState } from "react";

import ToDoForm from "./ToDoForm";
import { v4 as uuidv4 } from 'uuid';
import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";
uuidv4();

interface Task {
  id: string;
  task: string;
  completed: boolean;
}

type TodoId = string;

const ToDoWrapper = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const addTodo = (todo: string) => {
    setTodos([...todos, {
      id: uuidv4(),
      task: todo,
      completed: false,
    }]);
  };

  const toggleComplete = (id: TodoId) => {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteToDo = (id: TodoId) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const editToDo = (id: TodoId) => {
    setEditingTaskId(id); 
  };

  const editTask = (id: string, newTask: string) => {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, task: newTask } : todo));
    setEditingTaskId(null); 
  };

  const cancelEdit = () => {
    setEditingTaskId(null); 
  };

  return (
    <div className="TodoWrapper">
      <h1>
        TaskMinder:
      </h1>
      <h3>
        What's on the agenda today?
      </h3>
      <ToDoForm addTodo={addTodo} editToDo={editToDo} />
      {todos.map((todo) => (
        editingTaskId === todo.id ? (
          <EditToDoForm key={todo.id} editTodo={editTask} task={todo} onCancel={cancelEdit} />
        ) : (
          <ToDo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteToDo={deleteToDo}
            editToDo={editToDo}
          />
        )
      ))}
    </div>
  );
};

export default ToDoWrapper;
