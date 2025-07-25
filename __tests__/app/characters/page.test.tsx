import { render, screen } from "@testing-library/react";

import Characters from "@app/characters/page";
import { QueryProvider } from "@providers/QueryProvider";

describe("Characters tests:", () => {
  it("should render a title", () => {
    render(
      <QueryProvider>
        <Characters />
      </QueryProvider>,
    );

    const title = screen.getByPlaceholderText(/character/i);

    expect(title).toBeTruthy();
  });
});
