import React from 'react';
import { mount } from 'enzyme';
import Icon, { icons } from './index';

describe('Icon', () => {
  describe('icons', () => {
    test('should export all available icons', () => {
      expect(icons).toBeDefined();
      // expect(icons).to.be.array;
    });
  });

  describe('default', () => {
    test('should exists', () => {
      expect(Icon).toBeDefined();
    });

    describe('render', () => {
      test('should render in i tag', () => {
        const instance = mount(
          <div>
            <Icon name={icons[0]} />
          </div>
        );
        expect(instance.find('i')).toHaveLength(1);
      });
    });
  });
});
