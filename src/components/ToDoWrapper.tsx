import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ToDoForm from "./ToDoForm";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";
uuidv4();

interface Task {
  id: string;
  task: string;
  completed: boolean;
  color: string;
}

type TodoId = string;

function getRandomColor() {
  const letters = ["#6007f0", "#6032a8", "#2d8f2b", "#c107f0", "#f0072e", "#0dab05", "#053cab", "#8f2b6a", "#324ea8", ];
  let color =  "#";
  for (let i = 0; i < 9; i++) {
    return letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

const ToDoWrapper = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const addTodo = (todo: string) => {
    if (todo.trim() === "") {
      toast("This field can't be empty, so unless your task is truly to do nothing, please try again.", {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
      });
      return;
    }
    setTodos([...todos, {
      id: uuidv4(),
      task: todo,
      completed: false,
      color: getRandomColor(),
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

  const onDragEnd = (result: DropResult) => {
    console.log("Hello")
    console.log("Drag result:", result);
    if (!result.destination) return;

    const updatedTodos = Array.from(todos);
    const [reorderedTodo] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, reorderedTodo);

    setTodos(updatedTodos);
  };



  return (
    <div className="TodoWrapper">
      <h1>
        TaskMinder:
      </h1>
      <h3>
        What's on the agenda today?
      </h3>
      

      <DragDropContext onDragEnd={onDragEnd}>
        
      <ToDoForm addTodo={addTodo} editToDo={editToDo} />

        <Droppable droppableId="todos">

          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="todo-list"
            >

              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingTaskId === todo.id ? (
                        <EditToDoForm
                          key={todo.id}
                          editTodo={editTask}
                          task={todo}
                          onCancel={cancelEdit}
                        />

                      ) : (

                        <ToDo
                          task={todo}
                          key={todo.id}
                          toggleComplete={toggleComplete}
                          deleteToDo={deleteToDo}
                          editToDo={editToDo}
                        />
                      )}

                    </li>

                  )}

                </Draggable>

              ))}

              {provided.placeholder}

            </ul>

          )}

        </Droppable>

      </DragDropContext>

    </div>
  );
};

export default ToDoWrapper;