import { render, screen } from "@testing-library/react";

import Characters from "@app/characters/page";

describe("Characters tests:", () => {
  it("should render a title", () => {
    render(<Characters />);

    const title = screen.getByPlaceholderText(/character/i);

    expect(title).toBeTruthy();
  });
});
