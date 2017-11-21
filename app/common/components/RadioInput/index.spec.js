import React from 'react';
import { shallow, mount } from 'enzyme';
import { RadioInput } from './index.js';

describe('RadioInput', () => {
  test('should have radio input element', () => {
    const inst = shallow(<RadioInput />);
    expect(inst.find('input')).toHaveLength(1);
    expect(inst.find('input').prop('type')).toEqual('radio');
  });
  describe('selected', () => {
    test('should support selected passing', () => {
      const inst = shallow(<RadioInput selected />);
      expect(inst.find('input').prop('checked')).toBeTruthy();

      const instFalse = shallow(<RadioInput selected={false} />);
      expect(instFalse.find('input').prop('checked')).toBeFalsy();

      const instDefault = shallow(<RadioInput />);
      expect(instDefault.find('input').prop('checked')).toBeFalsy();
    });
  });
  describe('props passing', () => {
    test('should pass name prop', () => {
      const inst = shallow(<RadioInput name="test" />);
      expect(inst.find('input').prop('name')).toEqual('test');
    });
    test('should pass value prop', () => {
      const inst = shallow(<RadioInput value="value" />);
      expect(inst.find('input').prop('value')).toEqual('value');
    });
    test('should pass disabled prop', () => {
      const inst = shallow(<RadioInput disabled />);
      expect(inst.find('input').prop('disabled')).toBeTruthy();
    });
  });
  describe('onChange', () => {
    test('should return value when click on element', () => {
      const spyCb = jest.fn();
      expect(spyCb).not.toHaveBeenCalled();
      const inst = shallow(<RadioInput onChange={spyCb} value="test" />);
      inst.find('input').simulate('change');
      expect(spyCb).toHaveBeenCalledWith('test');
    });
    test('should not been called if disabled is passed', () => {
      const spyCb = jest.fn();
      expect(spyCb).not.toHaveBeenCalled();
      const inst = shallow(
        <RadioInput onChange={spyCb} value="test" disabled />
      );
      inst.find('input').simulate('change');
      expect(spyCb).not.toHaveBeenCalled();
    });
  });
  describe('group of inputs', () => {
    class TestGroup extends React.Component {
      state = {
        value: 'a'
      };
      onChange(value) {
        this.setState({
          value
        });
      }
      render() {
        return (
          <div>
            <RadioInput
              name="test"
              value="a"
              selected={this.state.value === 'a'}
              onChange={v => this.onChange(v)}
            />
            <RadioInput
              name="test"
              value="b"
              selected={this.state.value === 'b'}
              onChange={v => this.onChange(v)}
            />
            <RadioInput
              name="test"
              value="c"
              selected={this.state.value === 'c'}
              onChange={v => this.onChange(v)}
            />
          </div>
        );
      }
    }
    test('should work', () => {
      const wrapper = mount(<TestGroup />);
      const inputA = wrapper.find('input[value="a"]');
      const inputB = wrapper.find('input[value="b"]');
      const inputC = wrapper.find('input[value="c"]');
      expect(inputA.prop('checked')).toBeTruthy(); // from initial state
      inputC.simulate('change');
      expect(inputA.prop('checked')).toBeFalsy();
      expect(wrapper.state('value')).toEqual('c');
      inputB.simulate('change');
      expect(inputB.prop('checked')).toBeTruthy();
      expect(inputC.prop('checked')).toBeFalsy();
      expect(wrapper.state('value')).toEqual('b');
    });
  });
});
