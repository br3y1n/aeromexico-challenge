import { ApiAdapterError } from "@infrastructure/api/errors/ApiAdapterError";
import { catchApiErrors } from "@infrastructure/api/wrappers/catch-api-errors";

describe("catchApiErrors tests:", () => {
  const fn = vi.fn();

  beforeEach(() => {
    fn.mockReset();
  });

  it("should return resolved value when no error is thrown", async () => {
    fn.mockResolvedValue("result");

    const wrapped = catchApiErrors(fn);

    await expect(wrapped("arg")).resolves.toBe("result");
    expect(fn).toHaveBeenCalledWith("arg");
  });

  it("should reject with ApiAdapterError when TypeError is thrown", async () => {
    fn.mockRejectedValue(new TypeError("Failed to fetch"));

    const wrapped = catchApiErrors(fn);

    await expect(wrapped()).rejects.toBeInstanceOf(ApiAdapterError);
    await expect(wrapped()).rejects.toThrow("Data could not be extracted");
  });

  it("should reject with original error when it's not a TypeError", async () => {
    const error = new Error("Other error");
    fn.mockRejectedValue(error);

    const wrapped = catchApiErrors(fn);

    await expect(wrapped()).rejects.toBe(error);
  });
});
