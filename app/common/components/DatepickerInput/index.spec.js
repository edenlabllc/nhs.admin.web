import React from 'react';
import DatepickerComponent from 'react-datepicker';
import { shallow, mount } from 'enzyme';
import Input from '../Input';
import { ComponentInput as DatepickerInput } from './index';

describe('DatepickerInput', () => {
  test('should use Input component', () => {
    const wrapper = shallow(<DatepickerInput />);
    expect(wrapper.find(Input)).toHaveLength(1);
  });
  test('should pass all not mask, guide props to Input', () => {
    const wrapper = shallow(<DatepickerInput value="1" labelText="2" />);
    expect(wrapper.find(Input).prop('value')).toEqual('1');
    expect(wrapper.find(Input).prop('labelText')).toEqual('2');
  });
  test('should pass dateFormat property to DatepickerComponent', () => {
    const wrapper = mount(<DatepickerInput dateFormat="DD/MM/YY" />);
    expect(wrapper.find(DatepickerComponent).prop('dateFormat')).toEqual(
      'DD/MM/YY'
    );
  });
});
