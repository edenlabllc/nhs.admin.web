import React from 'react';
import { mount, shallow } from 'enzyme';

import styles from './styles.scss';
import Select from './index';
import List from './List';
import ListItem from './ListItem';
import SelectControl from './SelectControl';
import SelectControlItem from './SelectControlItem';

describe('Select', () => {
  describe('props', () => {
    const props = {
      options: [
        { name: '1', title: 'Title 1' },
        { name: '2', title: 'Title 2' }
      ],
      placeholder: 'Enter email'
    };

    it('should have all components', () => {
      const elem = mount(<Select {...props} />);
      expect(elem.find(List).length).toEqual(1);
      expect(elem.find(ListItem).length).toEqual(2);
      expect(elem.find(SelectControl).length).toEqual(1);
    });

    it('should have options', () => {
      const elem = mount(<Select {...props} />);
      expect(elem.find(List).prop('options')).toEqual(props.options);
    });

    it('should have placeholder', () => {
      const elem = mount(<Select {...props} />);
      expect(elem.find(SelectControl).prop('placeholder')).toEqual(
        props.placeholder
      );
    });
  });
});

describe('List', () => {
  describe('props', () => {
    it('should have ListItem element', () => {
      const props = {
        options: [{ name: '1' }, { name: '2' }],
        isActiveItem: () => {}
      };

      const elem = shallow(<List {...props} />);
      expect(elem.find(ListItem).length).toEqual(props.options.length);
    });
    it('should show emptyText', () => {
      const props = {
        options: [],
        emptyText: 'Not found'
      };

      const elem = shallow(<List {...props} />);
      expect(elem.find('li').prop('children')).toEqual(props.emptyText);
    });
  });
  describe('events', () => {
    it('show have open class', () => {
      const props = {
        options: [{ name: '1' }, { name: '2' }],
        open: true,
        isActiveItem: () => {}
      };
      const elem = shallow(<List {...props} />);
      expect(elem.find(`.${styles.open}`)).toHaveLength(1);
    });
    it('should close on click', () => {
      const spyCb = jest.fn();
      const props = {
        options: [{ name: '1', title: 1 }, { name: '2', title: 1 }],
        onClickItem: spyCb,
        open: true
      };
      expect(spyCb).not.toHaveBeenCalled();
      const elem = mount(<List {...props} />);
      expect(elem.find(`.${styles.open}`)).toHaveLength(1);
      elem
        .find(ListItem)
        .first()
        .simulate('click');
      expect(spyCb).toHaveBeenCalled();
    });
  });
});

describe('ListItem', () => {
  describe('props', () => {
    it('should have list item with title', () => {
      const props = {
        title: 'name 1'
      };
      const elem = shallow(<ListItem {...props} />);
      expect(elem.find('li').text()).toEqual(props.title);
    });
    it('should have an check for active element', () => {
      const props = {
        title: 'name 1',
        active: true
      };
      const elem = shallow(<ListItem {...props} />);
      expect(elem.find('Icon')).toBeDefined();
    });
    it('should have disabled styles', () => {
      const props = {
        title: 'name 1',
        disabled: true
      };
      const elem = shallow(<ListItem {...props} />);
      expect(elem.find(`.${styles.disabled}`)).toHaveLength(1);
    });
  });
});

describe('SelectControlItem', () => {
  describe('props', () => {
    it('should have one control item with title', () => {
      const props = {
        title: 'name 1'
      };
      const elem = shallow(<SelectControlItem {...props} />);
      expect(elem.find('li').text()).toEqual(props.title);
    });
    it('should have multiple list item with title and remove btn', () => {
      const props = {
        title: 'name 1',
        multiple: true
      };
      const elem = shallow(<SelectControlItem {...props} />);
      expect(elem.find('li').text()).toEqual(props.title);
      expect(elem.find(`.${styles.close}`)).toHaveLength(1);
    });
  });
});
