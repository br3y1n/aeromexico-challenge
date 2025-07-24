import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { CharacterCard } from "@components/CharacterCard";
import { KeysEnum } from "@enums";

describe("CharacterCard tests:", () => {
  const mockOnClick = vi.fn();
  const mockOnLike = vi.fn();
  const testTitle = "Test Character";
  const testData = { id: 1, name: "Test" };

  const renderComponent = (props = {}) => {
    const defaultProps = {
      title: testTitle,
      onClick: mockOnClick,
      onLike: mockOnLike,
      selected: false,
      liked: false,
      data: testData,
      ...props,
    };
    return render(<CharacterCard {...defaultProps} />);
  };

  const getCard = () => screen.getByRole("button", { name: /Character card/i });

  const getIconButton = () =>
    screen.getByRole("button", { name: /like character/i });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders basic elements", () => {
    renderComponent();
    const card = getCard();
    const title = screen.queryByRole("heading", { level: 3 });
    const img = screen.queryByAltText(`Image of ${testTitle}`);
    const like = screen.queryByText("Like");

    expect(card).toBeTruthy();
    expect(title).toBeTruthy();
    expect(img).toBeTruthy();
    expect(like).toBeTruthy();
  });

  it("handles selected state", () => {
    renderComponent({ selected: true });

    const card = getCard();

    expect(card.className.includes("border-green-600")).toBe(true);
    expect(card.getAttribute("aria-pressed")).toBe("true");
  });

  it("handles liked state", () => {
    renderComponent({ liked: true });

    const likeBtn = getIconButton();

    expect(likeBtn.className.includes("text-red-500")).toBe(true);
    expect(likeBtn.getAttribute("aria-pressed")).toBe("true");
  });

  it("triggers onClick", async () => {
    renderComponent();

    const card = getCard();

    await userEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(testData);
  });

  it("handles keyboard events to onClick", async () => {
    renderComponent();

    const card = getCard();

    card.focus();
    await userEvent.keyboard(`{${KeysEnum.ENTER}}`);
    await userEvent.keyboard(KeysEnum.SPACE);

    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it("handles keyboard events to onLike", async () => {
    renderComponent();

    const iconButton = getIconButton();

    iconButton.focus();
    await userEvent.keyboard(`{${KeysEnum.ENTER}}`);

    expect(mockOnClick).toHaveBeenCalledTimes(0);
    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });

  it("triggers onLike and stop propagation", async () => {
    renderComponent();

    const iconButton = getIconButton();

    await userEvent.click(iconButton);

    expect(mockOnLike).toHaveBeenCalledWith(testData);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("has correct accessibility attributes", () => {
    renderComponent();
    const card = getCard();
    const iconButton = getIconButton();

    expect(card.getAttribute("tabindex")).toBe("0");
    expect(iconButton.getAttribute("type")).toBe("button");
  });

  it("renders heart icon correctly", () => {
    renderComponent();
    const iconContainer = getIconButton();
    const icon = iconContainer.firstElementChild!;

    expect(icon.getAttribute("aria-hidden")).toBe("true");
  });
});
