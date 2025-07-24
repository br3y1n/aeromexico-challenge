import { ApiAdapterError } from "../errors/ApiAdapterError";

const catchApiErrors =
  <CurrentValue, Args extends unknown[]>(
    fn: (...args: Args) => Promise<CurrentValue>,
  ) =>
  async (...args: Args): Promise<CurrentValue> => {
    try {
      return await fn(...args);
    } catch (error) {
      return await Promise.reject(
        error instanceof TypeError
          ? new ApiAdapterError("Data could not be extracted")
          : error,
      );
    }
  };

export { catchApiErrors };
