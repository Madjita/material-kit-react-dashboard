import axios, { AxiosResponse, AxiosError } from 'axios';

const CREDENTIALS = true;

export const loginEmail = async (username: string, password: string): Promise<any> => {
  const url = `https://${window.location.hostname}:5000/login`;

  try {
    var data = {
      email: username,
      password: password
    }
    const response: AxiosResponse = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: CREDENTIALS , // Разрешить отправку и сохранение куков
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
  const url = `https://${window.location.hostname}:5000/loginTelegram`;
  console.log("window.location.hostname = ",window.location.hostname)
  try {
    const response: AxiosResponse = await axios.post(url, username, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: CREDENTIALS , // Разрешить отправку и сохранение куков
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
  const url = `https://${window.location.hostname}:5000/logout`;

  try {
    const response: AxiosResponse = await axios.post(url, {}, {
      headers: {
        'Accept': '	*/*',
      },
      withCredentials: CREDENTIALS , // Разрешить отправку и сохранение куков
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