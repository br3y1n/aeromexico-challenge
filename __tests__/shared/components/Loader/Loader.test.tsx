import { render, screen } from "@testing-library/react";

import { Loader } from "@components/Loader";

describe("Loader tests:", () => {
  it("When it's called, then 1 description is rendered", () => {
    render(<Loader />);

    const description = screen.getByText(/Loading/i);

    expect(description).toBeTruthy();
  });
});
