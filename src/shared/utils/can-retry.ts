import { configEnvs } from "@constants/config-envs.const";
import { ApiAdapterError } from "@infrastructure/api/errors/ApiAdapterError";

const canRetry = (failureCount: number, error: Error) =>
  !(error instanceof ApiAdapterError) &&
  failureCount < configEnvs.NUMBER_RETRIES_REQUEST;

export { canRetry };
