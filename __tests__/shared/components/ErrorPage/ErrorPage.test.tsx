import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ErrorPage } from "@components/ErrorPage";

describe("ErrorPage tests:", () => {
  const onClickMock = vi.fn();
  const customTitle = "custom title";
  const customDescription = "description";
  const buttonText = "buttom text";

  it("When it's called, then default error is rendered", () => {
    render(<ErrorPage />);

    const title = screen.getByText(/oops/i);

    expect(title).toBeTruthy();
  });

  it("When it's called with custom data, this data are rendered", () => {
    render(
      <ErrorPage
        button={{ onClick: onClickMock, text: buttonText }}
        description={customDescription}
        title={customTitle}
      />,
    );

    const title = screen.getByText(customTitle);
    const description = screen.getByText(customDescription);
    const button = screen.getByRole("button");

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it(`when the return button is clicked, then on click is called`, async () => {
    render(<ErrorPage button={{ onClick: onClickMock, text: buttonText }} />);

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(onClickMock).toBeCalled();
  });
});
