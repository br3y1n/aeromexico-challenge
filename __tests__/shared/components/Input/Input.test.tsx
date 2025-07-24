import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IoOpenSharp } from "react-icons/io5";

import { Input, InputProps } from "@components/Input";

describe("Input tests:", () => {
  const onChange = vi.fn();
  const onBlur = vi.fn();

  const props: InputProps = {
    placeholder: "placeholder",
    classNames: {
      container: "",
      input: "",
    },
    onChange,
    onBlur,
  };

  it("When it's called, then 1 input is rendered", () => {
    const { container } = render(<Input {...props} />);

    const [input] = screen.getAllByPlaceholderText(props.placeholder!);
    const [icon] = container.getElementsByTagName("svg");

    expect(input).toBeTruthy();
    expect(icon).not.toBeTruthy();
  });

  it("When it's called with icon, then 1 icon is rendered", () => {
    const { container } = render(
      <Input
        {...props}
        renderRightIcon={() => <IoOpenSharp />}
        renderLeftIcon={() => <IoOpenSharp />}
      />,
    );

    const [iconLeft, iconRight] = container.getElementsByTagName("svg");

    expect(iconLeft).toBeTruthy();
    expect(iconRight).toBeTruthy();
  });

  it("When it's filled and press Tab, then onChange and onBlur ared called", async () => {
    render(<Input {...props} />);

    const [input] = screen.getAllByPlaceholderText(props.placeholder!);

    await userEvent.type(input, "hi");
    await userEvent.tab();

    expect(onChange).toBeCalled();
    expect(onBlur).toBeCalled();
  });
});
