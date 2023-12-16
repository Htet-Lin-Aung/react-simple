import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  content: string;
}

interface ITaskState {
  tasks: Task[];
  selectedTask: Task | null;
  isEditing: boolean;
}

const initialState: ITaskState = {
  tasks: [],
  selectedTask: null,
  isEditing: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      if (state.selectedTask) {
        state.tasks = state.tasks.map((task) =>
            task.id === state.selectedTask?.id ? { ...task, ...action.payload } : task
        );
        state.selectedTask = null;
        state.isEditing = false;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, setSelectedTask, setIsEditing, addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
