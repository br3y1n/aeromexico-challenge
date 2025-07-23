import { render, screen } from "@testing-library/react";

import { StatusIndicator } from "@components/StatusIndicator";
import { StatusEnum } from "@enums";

describe("StatusIndicator tests:", () => {
  it.each([
    {
      status: StatusEnum.ALIVE,
      expected: {
        text: "live",
      },
    },
    {
      status: StatusEnum.DEAD,
      expected: {
        text: "dead",
      },
    },
  ])("should render a $status status", ({ expected, status }) => {
    render(<StatusIndicator status={status} />);

    const statusIndicator = screen.getByRole("status");
    const text = screen.getByText(expected.text);

    expect(statusIndicator).toBeTruthy();
    expect(text).toBeTruthy();
  });
});
