import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "@hooks/useDebounce";

describe("useDebounce tests:", () => {
  const callback = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    callback.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls callback after delay", () => {
    const { result } = renderHook(() => useDebounce(2000));

    act(() => {
      result.current.applyDebounce(callback);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("clears previous timeout if called again before delay", () => {
    const { result } = renderHook(() => useDebounce(2000));

    act(() => {
      result.current.applyDebounce(callback);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
      result.current.applyDebounce(callback);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("clearDebounce cancels the timer", () => {
    const { result } = renderHook(() => useDebounce(2000));

    act(() => {
      result.current.applyDebounce(callback);
    });

    act(() => {
      result.current.clearDebounce();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
