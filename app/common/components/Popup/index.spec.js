import React from 'react';
import { shallow, mount } from 'enzyme';

import styles from './styles.scss';
import { Popup, Confirm, Alert } from './index';

describe('Popup', () => {
  test('children', () => {
    const elem = shallow(
      <Popup>
        <span>Content</span>
      </Popup>
    );
    expect(elem.contains(<span>Content</span>)).toBeTruthy();
  });

  describe('props', () => {
    const elem = mount(<Popup title="Popup title" active theme="error" />);

    test('title', () => {
      expect(elem.text()).toBe('Popup title');
    });

    test('active', () => {
      expect(elem.find(`.${styles.active}`)).toHaveLength(1);
    });

    test('theme', () => {
      expect(elem.find(`.${styles['theme-error']}`)).toHaveLength(1);
    });

    test('bgCloser', () => {
      expect(elem.find(`.${styles.closer}`)).toHaveLength(1);
    });

    test('onClose', () => {
      const onClose = jest.fn();

      elem.setProps({ onClose });
      elem.find(`.${styles.closer}`).simulate('click');

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Alert', () => {
  test('children', () => {
    const elem = shallow(
      <Alert>
        <span>Content</span>
      </Alert>
    );
    expect(elem.contains(<span>Content</span>)).toBeTruthy();
  });

  test('use popup', () => {
    const elem = mount(<Alert />);
    expect(elem.find(Popup)).toHaveLength(1);
  });

  describe('props', () => {
    const elem = mount(
      <Alert title="Confirm" ok="Done" active theme="error" />
    );

    test('ok', () => {
      expect(elem.find('Button')).toHaveLength(1);
    });

    test('onClose', () => {
      const onClose = jest.fn();

      elem.setProps({ onClose });
      elem.find('Button').simulate('click');

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Confirm', () => {
  test('children', () => {
    const elem = shallow(
      <Confirm>
        <span>Content</span>
      </Confirm>
    );
    expect(elem.contains(<span>Content</span>)).toBeTruthy();
  });

  test('use popup', () => {
    const elem = mount(<Confirm />);
    expect(elem.find(Popup)).toHaveLength(1);
  });

  describe('props', () => {
    const elem = mount(
      <Confirm
        title="Confirm"
        confirm="Done"
        cancel="Cancel"
        active
        theme="error"
      />
    );

    test('confirm, cancel', () => {
      expect(elem.find('Button')).toHaveLength(2);
    });

    test('onCancel', () => {
      const onCancel = jest.fn();

      elem.setProps({ onCancel });
      elem
        .find('Button')
        .first()
        .simulate('click');

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test('onConfirm', () => {
      const onConfirm = jest.fn();

      elem.setProps({ onConfirm });
      elem
        .find('Button')
        .last()
        .simulate('click');

      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
