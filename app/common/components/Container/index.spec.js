import React from "react";
import { shallow } from "enzyme";

import { Container } from "./index";

describe("Container", () => {
  describe("children", () => {
    it("should pass children", () => {
      const wrapper = shallow(
        <Container>
          <h1>Title</h1>
        </Container>
      );
      expect(wrapper.contains(<h1>Title</h1>)).toBeTruthy();
    });
  });
});
