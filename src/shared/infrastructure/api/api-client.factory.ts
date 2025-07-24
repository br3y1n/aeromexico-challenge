import { configEnvs } from "@constants/config-envs.const";

import { ApiClient } from "./api-client.interface";
import { AxiosApiClient } from "./implementations/axios-api-client";

const createApiClient = (): ApiClient => {
  // TODO more clients...
  return new AxiosApiClient(configEnvs.API);
};

export { createApiClient };
