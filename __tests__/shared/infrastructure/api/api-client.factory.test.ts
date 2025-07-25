import { configEnvs } from "@constants/config-envs.const";
import { createApiClient } from "@infrastructure/api/api-client.factory";
import { AxiosApiClient } from "@infrastructure/api/implementations/axios-api-client";

vi.mock("@infrastructure/api/implementations/axios-api-client");

describe("createApiClient tests:", () => {
  it("should return an instance of AxiosApiClient with the correct baseURL", () => {
    createApiClient();

    expect(AxiosApiClient).toHaveBeenCalledWith(configEnvs.API);
  });
});
