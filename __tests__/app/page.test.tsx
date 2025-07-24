import { render, screen } from "@testing-library/react";

import Home from "@app/page";

describe("Home tests:", () => {
  it("should render a title", () => {
    render(<Home />);

    const title = screen.getByText(/home/i);

    expect(title).toBeTruthy();
  });
});
