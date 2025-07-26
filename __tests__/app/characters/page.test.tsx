import { render, screen } from "@testing-library/react";

import Characters from "@app/characters/page";
import { QueryProvider } from "@providers/QueryProvider";

describe("Characters tests:", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(max-width: 768px)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

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
