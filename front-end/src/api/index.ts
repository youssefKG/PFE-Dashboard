import { AxiosRequestConfig } from "axios";
import instanceAxios from "./axios.config";

class Api {
  public async get<T>(endPoint: string): Promise<T> {
    const response = await instanceAxios.get<T>(endPoint);
    return response as T;
  }

  public async post<T, L>(
    endPoint: string,
    body: L,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await instanceAxios.post<T>(endPoint, body, config);
      return response as T;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Unknown error try again");
    }
  }

  public async put<T, L>(endPoint: string, body: L): Promise<T> {
    const response = await instanceAxios.put<T>(endPoint, body);
    return response.data;
  }
}

const api = new Api();

export default api;
