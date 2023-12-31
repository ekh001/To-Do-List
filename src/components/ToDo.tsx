import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Task {
  id: string;
  task: string;
  completed: boolean;
  color: string;
}

interface ToDoProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteToDo: (id: string) => void;
  editToDo: (id: string) => void; 
}


const ToDo: React.FC<ToDoProps> = ({ task, toggleComplete, deleteToDo, editToDo }) => {

  const randomColor = task.color;
  return (
    <div className='Todo'
    style={{
      backgroundColor: randomColor
    }}>
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed': ""}`}>
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editToDo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteToDo(task.id)} />
      </div>
    </div>
  );
};

export default ToDo;
