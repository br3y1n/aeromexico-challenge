import { render } from "@testing-library/react";

import { StatBox } from "@components/StatBox/StatBox";

describe("StatBox tests:", () => {
  it("renders title, subtitle and value", () => {
    const { getByText } = render(
      <StatBox title="Revenue" subtitle="Last 7 days" value="$999" />,
    );

    const title = getByText("Revenue");
    const value = getByText("$999");
    const subtitle = getByText("Last 7 days");

    expect(title).toBeTruthy();
    expect(value).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });
});
