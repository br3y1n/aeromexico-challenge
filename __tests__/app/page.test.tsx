import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "@app/page";
import { RouteEnum } from "@enums/route.enum";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("Home Page tests:", () => {
  it("renders title, subtitle, description, image and button", () => {
    render(<Home />);
    const title = screen.getByText("Aeromexico Frontend Challenge");
    const subtitle = screen.getByText("Rick and Morty API Implementation");
    const description = screen.getByText(/Hello! I'm Brayan Arango/);
    const image = screen.getByAltText("The brayayin");
    const button = screen.getByRole("button");

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
    expect(description).toBeTruthy();
    expect(image).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("button click triggers navigation to characters", async () => {
    render(<Home />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(pushMock).toBeCalledWith(RouteEnum.CHARACTERS);
  });
});
