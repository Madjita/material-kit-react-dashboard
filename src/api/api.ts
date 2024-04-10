import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const GetApi = (host: string): AxiosInstance => {
  const api = axios.create({
    baseURL: `https://${host}`, //:5000
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return api;
}
