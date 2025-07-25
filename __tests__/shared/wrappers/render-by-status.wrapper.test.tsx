import { render, screen } from "@testing-library/react";

import { renderByStatus } from "@wrappers/render-by-status.wrapper";

vi.mock("@components/Loader", () => ({
  Loader: () => <div>Loader</div>,
}));

vi.mock("@components/ErrorPage", () => ({
  ErrorPage: () => <div>ErrorPage</div>,
}));

const DummyComponent = () => <div>RenderComponent</div>;

describe("renderByStatus tests:", () => {
  it("renders loader when isLoading is true", () => {
    const Wrapped = () =>
      renderByStatus(() => <DummyComponent />, {
        loader: { is: true },
        error: { is: false },
      });

    render(<Wrapped />);
    expect(screen.getByText("Loader")).toBeTruthy();
  });

  it("renders error when error is true and isLoading is false", () => {
    const Wrapped = () =>
      renderByStatus(() => <DummyComponent />, {
        loader: { is: false },
        error: { is: true },
      });

    render(<Wrapped />);
    expect(screen.getByText("ErrorPage")).toBeTruthy();
  });

  it("renders renderComponent when no error and not loading", () => {
    const Wrapped = () => renderByStatus(() => <DummyComponent />, {});

    render(<Wrapped />);
    expect(screen.getByText("RenderComponent")).toBeTruthy();
  });

  it("renders custom loader if provided", () => {
    const Wrapped = () =>
      renderByStatus(() => <DummyComponent />, {
        loader: { is: true, render: () => <div>CustomLoader</div> },
        error: { is: false },
      });

    render(<Wrapped />);
    expect(screen.getByText("CustomLoader")).toBeTruthy();
  });

  it("renders custom error if provided", () => {
    const Wrapped = () =>
      renderByStatus(() => <DummyComponent />, {
        loader: { is: false },
        error: { is: true, render: () => <div>CustomError</div> },
      });

    render(<Wrapped />);
    expect(screen.getByText("CustomError")).toBeTruthy();
  });
});
