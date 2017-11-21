import React from 'react';
import { mount } from 'enzyme';

import styles from './styles.scss';
import Select from './index';

describe('Select', () => {
  const elem = mount(
    <Select
      active="item2"
      placeholder="Select item..."
      options={[
        { name: 'item1', title: 'Item 1' },
        { name: 'item2', title: 'Item 2' }
      ]}
    />
  );

  describe('props', () => {
    test('options', () => {
      expect(elem.find('li')).toHaveLength(2);
    });

    test('placeholder', () => {
      expect(elem.find(`.${styles.placeholder}`).text()).toEqual(
        'Select item...'
      );
    });

    test('active', () => {
      expect(
        elem
          .find('div span')
          .at(1)
          .text()
      ).toEqual('Item 2');
      expect(elem.find(`.${styles.active}`)).toHaveLength(1);
    });

    test('onChange', () => {
      const onChange = jest.fn();

      elem.setProps({ onChange });
      elem
        .find('li')
        .first()
        .simulate('click');
      expect(onChange).toHaveBeenCalledWith('item1');
    });
  });
});
