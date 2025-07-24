interface ApiClient {
  get<Response>(url: string, config?: unknown): Promise<Response>;
  post<Response, Data>(
    url: string,
    data?: Data,
    config?: unknown,
  ): Promise<Response>;
}

export type { ApiClient };
