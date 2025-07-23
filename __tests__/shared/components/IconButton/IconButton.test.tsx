import { render, screen } from "@testing-library/react";
import { IoCloudyNightOutline } from "react-icons/io5";

import { IconButton } from "@components/IconButton";

describe("IconButton tests:", () => {
  it("When it's called, then 1 button with icon is rendered", () => {
    render(<IconButton renderIcon={() => <IoCloudyNightOutline />} />);

    const button = screen.getByRole("button");
    const [icon] = button.getElementsByTagName("svg");

    expect(button).toBeTruthy();
    expect(icon).toBeTruthy();
  });
});
