import { ApiClient } from "./api-client.interface";
import { AxiosApiClient } from "./implementations/axios-api-client";

const createApiClient = (apiUrl: string): ApiClient => {
  // TODO more clients...
  return new AxiosApiClient(apiUrl);
};

export { createApiClient };
