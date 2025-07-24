import { fireEvent, render, screen } from "@testing-library/react";

import { SafeImage } from "@components/SafeImage";

describe("SafeImage tests:", () => {
  const emptyImage = "/images/no-image.png";
  const src = "/image.png";

  it("When it's called, then 1 img is rendered", () => {
    render(<SafeImage alt="img" />);

    const img = screen.getByAltText(/img/);

    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toEqual(emptyImage);
  });

  it("When it's called with src, then 1 img is rendered with the same src", () => {
    render(<SafeImage alt="img" src={src} />);

    const img = screen.getByAltText(/img/);

    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toEqual(src);
  });

  it("When it's called with src and has error, then 1 img is rendered with the empty image and onError is called", () => {
    const onError = vi.fn();
    render(<SafeImage alt="img" src={src} onError={onError} />);

    const img = screen.getByAltText(/img/);

    fireEvent.error(img);

    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toEqual(emptyImage);
    expect(onError).toBeCalled();
  });
});
