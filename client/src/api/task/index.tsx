import axios from 'axios';
import { authJsonHeader } from '../headers';

const DOMAIN = import.meta.env.VITE_DOMAIN; // Replace with your API base URL

export interface ITask {
  id: number;
  content: string;
}

interface ITaskContent {
  content: string;
}

export const getTasks = async (token: string): Promise<{ body: ITask[] }> => {
  try {
    const response = await axios.get('/tasks', {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

export const createTask = async (blogData: ITaskContent, token: string): Promise<ITask> => {
  try {
    const response = await axios.post('/tasks', {
      content: blogData.content,
    }, {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating blog: ${error.message}`);
  }
};

export const updateTask = async (blogId: number, blogData: ITaskContent, token: string): Promise<ITask> => {
  try {
    const response = await axios.put(`/tasks/${blogId}`, {
      content: blogData.content,
    }, {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error updating blog: ${error.message}`);
  }
};

export const deleteTask = async (blogId: number, token: string): Promise<void> => {
  try {
    await axios.delete(`/tasks/${blogId}`, {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
  } catch (error: any) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
};
