import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TbTrash } from "react-icons/tb";

import {
  ActionDropdown,
  ActionDropdownProps,
} from "@components/ActionDropdown";
import { KeysEnum } from "@enums";

describe("ActionDropdown tests:", () => {
  const mockItemClick = vi.fn();
  const mockActionClick = vi.fn();
  const buttonLabel = "Actions";
  const testItems: ActionDropdownProps["items"] = [
    { id: "1", label: "Edit" },
    { id: "2", label: "Delete" },
    { id: "3", label: "Archive" },
  ];

  const renderComponent = () => {
    render(
      <ActionDropdown
        items={testItems}
        label={buttonLabel}
        actionIcon={<TbTrash />}
        onItemClick={mockItemClick}
        onActionClick={mockActionClick}
      />,
    );
    return screen.getByText(buttonLabel);
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the trigger button correctly", () => {
    const button = renderComponent();
    expect(button).toBeTruthy();
  });

  it("displays dropdown items when clicked", async () => {
    const button = renderComponent();

    expect(screen.queryByText("Edit")).not.toBeTruthy();

    await userEvent.click(button);

    await waitFor(() => {
      testItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeTruthy();
      });
    });
  });

  it("hides dropdown when ESC key is pressed", async () => {
    const button = renderComponent();
    await userEvent.click(button);

    await screen.findByText("Edit");

    await userEvent.keyboard(`{${KeysEnum.ESCAPE}}`);

    await waitFor(() => {
      expect(screen.queryByText("Edit")).not.toBeTruthy();
    });
  });

  it("closes dropdown when clicking outside", async () => {
    const button = renderComponent();
    await userEvent.click(button);

    await screen.findByText("Edit");

    await userEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByText("Edit")).not.toBeTruthy();
    });
  });

  it("calls onItemClick when item is selected", async () => {
    const button = renderComponent();
    await userEvent.click(button);

    const editItem = await screen.findByText("Edit");
    await userEvent.click(editItem);

    expect(mockItemClick).toHaveBeenCalledTimes(1);
    expect(mockItemClick).toHaveBeenCalledWith(testItems[0]);
  });

  it("handles action icon clicks correctly", async () => {
    const button = renderComponent();
    await userEvent.click(button);

    const actionButtons = await screen.findAllByRole("button", {
      name: /Action for/,
    });

    expect(actionButtons).toHaveLength(testItems.length);

    await userEvent.click(actionButtons[0]);

    expect(mockActionClick).toHaveBeenCalledTimes(1);
    expect(mockActionClick).toHaveBeenCalledWith(testItems[0]);
  });
});
