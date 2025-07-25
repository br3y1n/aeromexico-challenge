import { ApiAdapterError } from "@infrastructure/api/errors/ApiAdapterError";
import { canRetry } from "@utils/can-retry";

vi.mock("@constants/config-envs.const", () => ({
  configEnvs: {
    NUMBER_RETRIES_REQUEST: 3,
  },
}));

describe("canRetry tests:", () => {
  it("returns true if error is not ApiAdapterError and failureCount is below limit", () => {
    const error = new Error("generic");
    expect(canRetry(2, error)).toBe(true);
  });

  it("returns false if error is ApiAdapterError", () => {
    const error = new ApiAdapterError("adapter failed");
    expect(canRetry(1, error)).toBe(false);
  });

  it("returns false if failureCount >= limit", () => {
    const error = new Error("generic");
    expect(canRetry(3, error)).toBe(false);
    expect(canRetry(4, error)).toBe(false);
  });
});
