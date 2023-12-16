import React, { useContext } from "react";
import withTaskCRUD from "./withTaskHoc";

const TasksComponent = ({
    tasks, createTask, deleteTask, updateTask, undoTask
}) => {

    return(
        <div>
          <button onClick={ () => {
            createTask({
                id: tasks.length+1, title: `New Task ${tasks.length+1}`
            });
          }}>Add Task</button>
          <button onClick={undoTask}>Undo Task</button>
          {tasks.map(task => (
                <div key={task.id}>
                    {task.title}
                    <button onClick={ () => deleteTask(task.id) }>Delete Task</button>
                    <button onClick={ () => updateTask(task.id) }>Update Task</button>
                </div>
          ))}
        </div>
    );
}

const TaskComponentWrapper = withTaskCRUD(TasksComponent);
export default TaskComponentWrapper;