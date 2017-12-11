import React from "react";
import { mount } from "enzyme";
import Checkbox from "./index";

describe("Checkbox", () => {
  it("should have input element", () => {
    const inst = mount(<Checkbox />);
    expect(inst.find("input")).toHaveLength(1);
  });
  describe("checked", () => {
    it("should support checked passing", () => {
      const inst = mount(<Checkbox checked="true" />);
      expect(inst.find("input").prop("checked")).toBeTruthy();

      const instFalse = mount(<Checkbox checked={false} />);
      expect(instFalse.find("input").prop("checked")).toBeFalsy();

      const instDefault = mount(<Checkbox />);
      expect(instDefault.find("input").prop("checked")).toBeFalsy();
    });

    it("should not change on click events", () => {
      const inst = mount(<Checkbox checked="true" />);
      inst.find("input").simulate("change", { target: { checked: false } });
      expect(inst.find("input").prop("checked")).toBeTruthy();

      const instFalse = mount(<Checkbox checked={false} />);
      instFalse.find("input").simulate("change", { target: { checked: true } });
      expect(instFalse.find("input").prop("checked")).toBeFalsy();

      const instDefault = mount(<Checkbox />);
      instDefault
        .find("input")
        .simulate("change", { target: { checked: true } });
      expect(instDefault.find("input").prop("checked")).toBeFalsy();
    });
  });
  describe("onChange", () => {
    it("should be invoked on click", () => {
      const onChangeHandler = jest.fn();
      expect(onChangeHandler).not.toHaveBeenCalled();

      const inst = mount(<Checkbox onChange={onChangeHandler} />);
      inst.find("input").simulate("change", { target: { checked: true } });
      inst.find("input").simulate("change", { target: { checked: false } });

      expect(onChangeHandler).toHaveBeenCalledWith(true);
      expect(onChangeHandler).toHaveBeenCalledWith(false);
    });
  });
});
