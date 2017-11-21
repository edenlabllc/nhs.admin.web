import React from 'react';
import { shallow, mount } from 'enzyme';

import { Title, H1, H2, H3, H4, H5, H6 } from './index';
import styles from './styles.scss';

describe('Title', () => {
  test('children', () => {
    const elem = mount(
      <Title>
        <span>Title text</span>
      </Title>
    );

    expect(elem.contains(<span>Title text</span>)).toBeTruthy();
  });
  describe('default', () => {
    test('tag and type', () => {
      const elem = mount(<Title>Title text</Title>);
      expect(elem.find('h3')).toHaveLength(1);
      expect(elem.find(`.${styles.h1}`)).toHaveLength(1);
    });
  });
  describe('props', () => {
    test('type', () => {
      const elem = mount(<Title type="h2">Title text</Title>);
      expect(elem.find(`.${styles.h2}`)).toHaveLength(1);
    });

    test('tag', () => {
      const elem = mount(<Title tag="h2">Title text</Title>);
      expect(elem.find('h2')).toHaveLength(1);
    });

    test('tag and type', () => {
      const elem = mount(
        <Title type="h1" tag="h2">
          Title text
        </Title>
      );
      expect(elem.find('h2')).toHaveLength(1);
      expect(elem.find(`.${styles.h1}`)).toHaveLength(1);
    });
  });
});

describe('H1', () => {
  test('children', () => {
    const elem = shallow(
      <H1>
        <span>Title text</span>
      </H1>
    );

    expect(elem.contains(<span>Title text</span>)).toBeTruthy();
  });

  describe('props', () => {
    test('tag', () => {
      const elem = mount(<H1 tag="h2">Title text</H1>);
      expect(elem.find('h2')).toHaveLength(1);
      expect(elem.find(`.${styles.h1}`)).toHaveLength(1);
    });
  });
});

describe('H2', () => {
  test('children', () => {
    const elem = shallow(
      <H2>
        <span>Title text</span>
      </H2>
    );

    expect(elem.contains(<span>Title text</span>)).toBeTruthy();
  });

  describe('props', () => {
    test('tag', () => {
      const elem = mount(<H2 tag="h1">Title text</H2>);
      expect(elem.find('h1')).toHaveLength(1);
      expect(elem.find(`.${styles.h2}`)).toHaveLength(1);
    });
  });
});

describe('H3', () => {
  test('children', () => {
    const elem = shallow(
      <H3>
        <span>Title text</span>
      </H3>
    );

    expect(elem.contains(<span>Title text</span>)).toBeTruthy();
  });

  describe('props', () => {
    test('tag', () => {
      const elem = mount(<H3 tag="h1">Title text</H3>);
      expect(elem.find('h1')).toHaveLength(1);
      expect(elem.find(`.${styles.h3}`)).toHaveLength(1);
    });
  });
});

describe('H4', () => {
  test('children', () => {
    const elem = shallow(
      <H4>
        <span>Title text</span>
      </H4>
    );

    expect(elem.contains(<span>Title text</span>)).toBeTruthy();
  });

  describe('props', () => {
    test('tag', () => {
      const elem = mount(<H4 tag="h1">Title text</H4>);
      expect(elem.find('h1')).toHaveLength(1);
      expect(elem.find(`.${styles.h4}`)).toHaveLength(1);
    });
  });
});

describe('H5', () => {
  test('children', () => {
    const elem = shallow(
      <H5>
        <span>Title text</span>
      </H5>
    );

    expect(elem.contains(<span>Title text</span>)).toBeTruthy();
  });

  describe('props', () => {
    test('tag', () => {
      const elem = mount(<H5 tag="h1">Title text</H5>);
      expect(elem.find('h1')).toHaveLength(1);
      expect(elem.find(`.${styles.h5}`)).toHaveLength(1);
    });
  });
});

describe('H6', () => {
  test('children', () => {
    const elem = shallow(
      <H6>
        <span>Title text</span>
      </H6>
    );

    expect(elem.contains(<span>Title text</span>)).toBeTruthy();
  });

  describe('props', () => {
    test('tag', () => {
      const elem = mount(<H6 tag="h1">Title text</H6>);
      expect(elem.find('h1')).toHaveLength(1);
      expect(elem.find(`.${styles.h6}`)).toHaveLength(1);
    });
  });
});
