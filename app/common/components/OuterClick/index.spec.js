import React from "react";
import { mount } from "enzyme";

import OuterClick from "./index";

describe("OuterClick", () => {
  let onClick;
  beforeEach(() => {
    onClick = jest.fn();
  });

  it("called on outer click", () => {
    mount(
      <OuterClick onClick={onClick}>
        <div>Test</div>
      </OuterClick>
    );

    document.body.dispatchEvent(new Event("click", { bubbles: true }));
    expect(onClick).toHaveBeenCalled();
  });

  it("no called on inner click", () => {
    const elem = mount(
      <OuterClick onClick={onClick}>
        <div>Test</div>
      </OuterClick>
    );
    elem.find("div").simulate("click");
    expect(onClick).not.toHaveBeenCalled();
  });
});
