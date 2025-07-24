import { renderHook } from "@testing-library/react";

import { RouteEnum } from "@enums/route.enum";
import { useGoTo } from "@hooks/useGoTo";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("useGoTo tests:", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("When goToHome is called, then push is called with home route ", () => {
    const { result } = renderHook(useGoTo);

    result.current.goToHome();

    expect(pushMock).toBeCalledWith(RouteEnum.HOME);
  });

  it("When goToCharacters is called, then push is called with characters route ", () => {
    const { result } = renderHook(useGoTo);

    result.current.goToCharacters();

    expect(pushMock).toBeCalledWith(RouteEnum.CHARACTERS);
  });
});
