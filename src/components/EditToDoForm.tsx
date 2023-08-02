import React, { useState } from 'react';

interface Task {
  id: string;
  task: string;
}

interface ToDoFormProps {
  editTodo: (id: string, task: string) => void;
}

interface EditToDoFormProps extends ToDoFormProps {
  task: Task;
  onCancel: () => void; 
}

const EditToDoForm: React.FC<EditToDoFormProps> = ({ editTodo, task, onCancel }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(task.id, value); 
    onCancel(); 
  };

  return (
    <div>
      <form action="" className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={value}
          placeholder='Update Task'
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          Update Me
        </button>
        <button type="button" className="todo-btn" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditToDoForm;
