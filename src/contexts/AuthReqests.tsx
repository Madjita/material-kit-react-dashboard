import axios, { AxiosResponse, AxiosError } from 'axios';
import {GetApi} from '../../src/api/api';

export const loginEmail = async (username: string, password: string): Promise<any> => {
  try {
    let data = {
      email: username,
      password: password
    }
    const response: AxiosResponse = await GetApi(window.location.hostname).post('/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true , // Разрешить отправку и сохранение куков
    });
    console.log("response ",response);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Обработка ошибок Axios
      const axiosError: AxiosError = error;
      console.error('Ошибка при выполнении запроса:', axiosError);
      throw axiosError;
    } else {
      // Другие типы ошибок
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  }
}


export const loginTelegram = async (username: string): Promise<any> => {
  console.log("window.location.hostname = ",window.location.hostname)
  try {
    const response: AxiosResponse = await GetApi(window.location.hostname).post('/loginTelegram', username, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true , // Разрешить отправку и сохранение куков
    });
    console.log("response ",response);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Обработка ошибок Axios
      const axiosError: AxiosError = error;
      console.error('Ошибка при выполнении запроса:', axiosError);
      throw axiosError;
    } else {
      // Другие типы ошибок
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  }
};

export const logOut = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await GetApi(window.location.hostname).post('/logout', {}, {
      headers: {
        'Accept': '	*/*',
      },
      withCredentials: true , // Разрешить отправку и сохранение куков
    });
    console.log("response ",response);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Обработка ошибок Axios
      const axiosError: AxiosError = error;
      console.error('Ошибка при выполнении запроса:', axiosError);
      throw axiosError;
    } else {
      // Другие типы ошибок
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  }
}