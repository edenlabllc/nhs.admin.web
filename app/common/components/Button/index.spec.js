import React from 'react';
import { shallow, mount } from 'enzyme';

import Button from './index';
import styles from './styles.scss';

describe('Button', () => {
  test('children', () => {
    const elem = shallow(
      <Button>
        <span>My button</span>
      </Button>
    );
    expect(elem.contains(<span>My button</span>)).toBeTruthy();
  });

  describe('props', () => {
    const elem = shallow(
      <Button theme="border" size="small" color="blue" active disabled />
    );

    test('theme', () => {
      expect(
        elem.render().find(`button.${styles['theme-border']}`)
      ).toHaveLength(1);
    });

    test('size', () => {
      expect(elem.render().find(`button.${styles['size-small']}`)).toHaveLength(
        1
      );
    });

    test('color', () => {
      expect(elem.render().find(`button.${styles['color-blue']}`)).toHaveLength(
        1
      );
    });

    test('disabled', () => {
      expect(elem.render().find(`button.${styles.disabled}`)).toHaveLength(1);
    });

    test('active', () => {
      expect(elem.render().find(`button.${styles.active}`)).toHaveLength(1);
    });

    test('icon', () => {
      const elem = mount(<Button icon="close" />);
      expect(elem.find('Icon').props().name).toEqual('close');
    });

    describe('type', () => {
      test('should be button by default', () => {
        const wrapper = mount(<Button />);
        expect(wrapper.find('button').prop('type')).toEqual('button');
      });
      test('should be passed to button', () => {
        const wrapperType = mount(<Button type="test" />);
        expect(wrapperType.find('button').prop('type')).toEqual('test');
      });
    });

    describe('onClick', () => {
      let handleClick;
      beforeEach(() => {
        handleClick = jest.fn();
      });

      test('should work', () => {
        const elem = shallow(<Button onClick={handleClick} />);
        elem.simulate('click');
        expect(handleClick).toHaveBeenCalled();
      });

      // @todo Fix this test.
      test('should not be called if button disabled', () => {
        // const elem = shallow(<Button disabled onClick={handleClick} />);
        // elem.simulate('click');
        // expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('to', () => {
      test('should work inner link', () => {
        const elem = mount(<Button to="/" />);
        expect(elem.find('Link')).toHaveLength(1);
      });

      test('should work outer link', () => {
        const elem = shallow(<Button to="http://google.com" />);
        expect(elem.render().find('a[href="http://google.com"]')).toHaveLength(
          1
        );
      });
    });
  });
});
