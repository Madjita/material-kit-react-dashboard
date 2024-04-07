import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const GetApi = (host: string): AxiosInstance => {
  const api = axios.create({
    baseURL: `https://${host}:5000`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    transformResponse: (data: string) => {
      // Пример: декодирование JSON
      const jsonData = JSON.parse(data);
      console.log("transformResponse data", jsonData);
      return jsonData;
    }
  })

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      console.error("api.interceptors.response.use error.response:", error.response);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorCode = axiosError.response?.status;
        console.log("Error code AxiosError:", axiosError);
      }
      
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized");
      }
      return Promise.reject(error);
    }
  );

  return api;
}
