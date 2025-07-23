import { render, screen } from "@testing-library/react";
import React from "react";

import RootLayout from "../../src/app/layout";

describe("RootLayout tests:", () => {
  it("renders children inside the layout", () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Child</div>
      </RootLayout>,
    );

    const child = screen.queryByTestId("test-child");

    expect(child).not.toBeNull();
    expect(child?.textContent).toBe("Test Child");
  });
});
