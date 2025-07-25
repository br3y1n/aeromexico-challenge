import { configEnvs } from "@constants/config-envs.const";
import { delayApiMock } from "@infrastructure/api/wrappers/delay-api-mock";

describe("delayApiMock tests:", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should delay execution and return the result", async () => {
    const mockFn = vi.fn().mockResolvedValue("done");

    const wrapped = delayApiMock(mockFn);
    const promise = wrapped("arg1", "arg2");

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(configEnvs.MOCK_DELAY_RESPONSE_MS);

    await expect(promise).resolves.toBe("done");
    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");
  });
});
