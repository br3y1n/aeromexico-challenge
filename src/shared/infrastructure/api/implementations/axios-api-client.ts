import axios, { AxiosInstance } from "axios";

import { ApiClient } from "../api-client.interface";

class AxiosApiClient implements ApiClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.instance.get<T>(url);

    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.instance.post<T>(url, data);
    return response.data;
  }
}

export { AxiosApiClient };
