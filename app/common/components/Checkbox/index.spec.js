import React from 'react';
import { mount } from 'enzyme';
import Checkbox from './index';

describe('Checkbox', () => {
  test('should have input element', () => {
    const inst = mount(<Checkbox />);
    expect(inst.find('input')).toHaveLength(1);
  });
  describe('checked', () => {
    test('should support checked passing', () => {
      const inst = mount(<Checkbox checked="true" />);
      expect(inst.find('input').prop('checked')).toBe('true');

      const instFalse = mount(<Checkbox checked={false} />);
      expect(instFalse.find('input').prop('checked')).toBeFalsy();

      const instDefault = mount(<Checkbox />);
      expect(instDefault.find('input').prop('checked')).toBeFalsy();
    });

    test('should not change on click events', () => {
      const inst = mount(<Checkbox checked="true" />);
      inst.find('input').simulate('change', { target: { checked: false } });
      expect(inst.find('input').prop('checked')).toBe('true');

      const instFalse = mount(<Checkbox checked={false} />);
      instFalse.find('input').simulate('change', { target: { checked: true } });
      expect(instFalse.find('input').prop('checked')).toBeFalsy();

      const instDefault = mount(<Checkbox />);
      instDefault
        .find('input')
        .simulate('change', { target: { checked: true } });
      expect(instDefault.find('input').prop('checked')).toBeFalsy();
    });
  });
  describe('onChange', () => {
    test('should be invoked on click', () => {
      const spyCb = jest.fn();
      expect(spyCb).not.toHaveBeenCalled();

      const inst = mount(<Checkbox onChange={spyCb} />);
      inst.find('input').simulate('change', { target: { checked: true } });
      inst.find('input').simulate('change', { target: { checked: false } });

      expect(spyCb).toHaveBeenCalledWith(true);
      expect(spyCb).toHaveBeenCalledWith(false);
    });
  });
});
