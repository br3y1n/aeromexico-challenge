import { configEnvs } from "@constants/config-envs.const";

const delayApiLocal =
  <CurrentValue, Args>(fn: (...args: Args[]) => Promise<CurrentValue>) =>
  async (...args: Args[]): Promise<CurrentValue> => {
    return await new Promise((resolve) =>
      setTimeout(() => {
        resolve(fn(...args));
      }, configEnvs.LOCAL_DELAY_RESPONSE_MS),
    );
  };

export { delayApiLocal };
