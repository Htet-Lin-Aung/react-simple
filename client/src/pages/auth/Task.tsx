import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setTasks, 
    setSelectedTask, 
    setIsEditing, 
    addTask, 
    updateTask, 
    deleteTask 
} from '../../store/reducers/task.reducer';
import { getTasks, 
    createTask as createTaskApi, 
    updateTask as updateTaskApi, 
    deleteTask as deleteTaskApi, 
    ITask
} from '../../api/task';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textarea from '../../components/Textarea';

const validationSchema = Yup.object({
	content: Yup.string()
	.required("Task content is required"),
});

interface ITaskForm {
  content: string;
}

const Task: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.task?.tasks || []);
  const selectedTask = useSelector((state: any) => state.task?.selectedBlog || null);
  const isEditing = useSelector((state: any) => state.task?.isEditing || false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
    setValue
  } = useForm<ITaskForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const token = localStorage.getItem('token')??'';

  useEffect(() => {
    // Fetch blogs on component mount
    fetchTasks();
  }, []);

  useEffect(() => {
    // Set values when editing
    if (selectedTask) {
      setValue('content', selectedTask.content);
    }
  }, [selectedTask, setValue]);

  const fetchTasks = async () => {
    const { body: blogsData } = await getTasks(token);
    dispatch(setTasks(blogsData));
  };  
  
  const handleAddTask = async (data: ITaskForm) => {
    const newTask = await createTaskApi(data,token);
    dispatch(addTask(newTask));
    reset();
    // Fetch tasks after adding a new task
    fetchTasks();
  };

  const handleEditTask = (task: ITask) => {
    dispatch(setSelectedTask(task));
    dispatch(setIsEditing(true));
  };

  const handleUpdateTask = async (data: ITaskForm) => {
    if (selectedTask) {
      const updatedTask = await updateTaskApi(selectedTask.id, data,token);
      dispatch(updateTask(updatedTask));
      reset();
      dispatch(setSelectedTask(null));
      dispatch(setIsEditing(false));
      // Fetch tasks after updating a new task
      fetchTasks();
    }
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTaskApi(id,token);
    dispatch(deleteTask(id));
  };

  return (
    <>
        <div className="w-screen flex items-center justify-center p-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Task Manager</h3>
            <form onSubmit={isEditing ? handleSubmit(handleUpdateTask) : handleSubmit(handleAddTask)}>
                <div className="w-full flex flex-col mb-4">
                    <label>Task</label>
                    <Textarea
                    placeholder="Enter your content"
                    name="content"
                    control={control}
                    errors={errors}
                    isValid={isValid}
                    />
                </div>
                <div className='text-center'>
                  <button type="submit" className='bg-gray-700 rounded-md w-44 py-2 text-white text-center'>
                    {isEditing ? 'Update' : 'Add'} Blog
                  </button>
                </div>
            </form>
            </div>
        </div>
        <div className='flex m-10'>
          <ul className="w-screen border border-gray-700 rounded-md p-4 space-y-4">
            {tasks.length === 0 ? (
              <li className="text-gray-600">No tasks available.</li>
            ) : (
              tasks.map((task: ITask) => (
                <li key={task.id} className="bg-white p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">{task.content}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
    </>
  );
};

export default Task;
