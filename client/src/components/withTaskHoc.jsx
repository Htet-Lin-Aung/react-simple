import React, { useContext } from 'react';
import { TasksContext } from "../context";

const withTaskCRUD = (WrappedComponent) => {

  return function TaskCRUDComponent(props) {

    const {  tasks, createTask, deleteTask, updateTask, undoTask } = useContext(TasksContext);

    return <WrappedComponent {...props} {...{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        undoTask
      }} />;
  };
};

export default withTaskCRUD;