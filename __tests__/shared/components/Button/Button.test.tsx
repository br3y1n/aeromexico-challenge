import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@components/Button";

describe("Button tests:", () => {
  const onClick = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should be clicked if disabled is false", async () => {
    const buttonText = "button here!";

    render(<Button onClick={onClick} text={buttonText} />);

    const button = screen.getByText(buttonText);

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("shouldn't be clicked if disabled is true", async () => {
    const buttonText = "button here!";

    render(<Button onClick={onClick} text={buttonText} disabled />);

    const button = screen.getByText(buttonText);

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
