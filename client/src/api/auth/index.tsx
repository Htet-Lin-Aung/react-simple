import axios, { AxiosRequestConfig } from 'axios';
import { authJsonHeader, plainJsonHeader } from '../headers';
const BASE_URL = import.meta.env.VITE_DOMAIN;
const baseConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};
interface ILoginService {
  email: string;
  password: string;
}
interface IRegisterService {
  email: string;
  username: string;
  password: string;
}

export const loginService = async (data: ILoginService) => {
  try{
    const response = await axios({
      url: '/login',
      method: 'POST',
      headers: plainJsonHeader(),
      data: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      ...baseConfig,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }catch(error:any){
    return {
      status: error.response.status, 
      data: error.response, 
    };
  }
};

export const registerService = async (data: IRegisterService) => {
  try {
    const response = await axios({
      url: '/register',
      method: 'POST',
      headers: plainJsonHeader(),
      data: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      ...baseConfig,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {

    return {
      status: error.response.status, // Extract status code from error
      data: error.response.data, // Extract error message
    };
  }
};

export const logoutService = async (token: string) => {
  try{
    return axios({
      url: '/logout',
      method: 'POST',
      headers: authJsonHeader(token),
      ...baseConfig,
    });
  }catch(error:any){
    throw new Error(`Error in registerService: ${error.message}`);
  }
};

export const whoamiService = async (token: string) => {
  try{
    return axios({
      url: '/whoami',
      method: 'GET',
      headers: authJsonHeader(token),
      ...baseConfig,
    });
  }catch(error:any){
    throw new Error(`Error in registerService: ${error.message}`);
  }
};