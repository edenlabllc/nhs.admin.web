import React from "react";
import { mount } from "enzyme";
import Icon, { icons } from "./index";

describe("Icon", () => {
  describe("icons", () => {
    it("should export all available icons", () => {
      expect(icons).toBeDefined();
      expect(Array.isArray(icons)).toBeTruthy();
    });
  });

  describe("default", () => {
    it("should exists", () => {
      expect(Icon).toBeDefined();
    });

    describe("render", () => {
      it("should render in i tag", () => {
        const instance = mount(
          <div>
            <Icon name={icons[0]} />
          </div>
        );
        expect(instance.find("i")).toHaveLength(1);
      });
    });
  });
});
