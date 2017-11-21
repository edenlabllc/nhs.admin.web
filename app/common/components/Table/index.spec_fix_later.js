import React from 'react';
import { mount } from 'enzyme';

import styles from './styles.scss';

import Table, { TableRow, TableHead } from './index';

const tableData = [
  {
    title: 'Premium/Discount',
    estimated: '12%',
    current: '0%'
  },
  {
    title: 'Portfolio Volume',
    estimated: '€50,000',
    current: '€0'
  },
  {
    title: 'Invested',
    estimated: '€32,470',
    current: '€0'
  }
];

const tableColumns = [
  { title: 'Title', key: 'title' },
  { title: 'Estimated', key: 'estimated', align: 'right' },
  { title: 'Current', key: 'current', width: 100 }
];

const CustomRow = ({ columns = [], data = {} }) => (
  <tr>
    <td colSpan={columns.length}>{data.title}</td>
  </tr>
);

const CustomHead = ({ columns = [] }) => (
  <thead>
    <tr>
      <th colSpan={columns.length}>{columns[0].title}</th>
    </tr>
  </thead>
);

describe('TableRow', () => {
  const elem = mount(
    <TableRow
      columns={[
        { key: 'one', align: 'right', colspan: 2 },
        { key: 'two', align: 'right', colspan: 2 }
      ]}
      data={{ one: 'One', two: 'Two' }}
    />
  );

  test('render', () => {
    expect(elem.find('tr td')).toHaveLength(2);
  });

  describe('props', () => {
    test('data title', () => {
      expect(
        elem
          .find('td')
          .first()
          .text()
      ).toEqual('One');
    });

    test('columns align', () => {
      expect(elem.find(`.${styles.right}`)).toHaveLength(2);
    });

    test('columns colspan', () => {
      expect(elem.find('td[colSpan=2]')).toHaveLength(2);
    });
  });
});

describe('TableHead', () => {
  const elem = mount(
    <TableHead
      columns={[
        { key: 'one', title: 'One title', align: 'right', width: 200 },
        { key: 'two', title: 'Two title', width: 400 }
      ]}
    />
  );

  test('render', () => {
    expect(elem.find('thead tr th')).toHaveLength(2);
  });

  test('column position', () => {
    expect(
      elem
        .find('thead tr th')
        .at(0)
        .text()
    ).toEqual('One title');
    expect(
      elem
        .find('thead tr th')
        .at(1)
        .text()
    ).toEqual('Two title');
  });

  describe('props', () => {
    test('columns title', () => {
      expect(
        elem
          .find('th')
          .first()
          .text()
      ).toEqual('One title');
    });

    test('columns align', () => {
      expect(elem.find(`.${styles.right}`)).toHaveLength(1);
    });

    test('columns width', () => {
      expect(elem.find('th[width=200]')).toHaveLength(1);
    });
  });
});

describe('Table', () => {
  const elem = mount(<Table columns={tableColumns} data={tableData} />);

  describe('render', () => {
    test('table', () => {
      expect(elem.find('table tbody')).toHaveLength(1);
    });

    test('head', () => {
      expect(elem.find(TableHead)).toHaveLength(1);
    });

    test('rows', () => {
      expect(elem.find(TableRow)).toHaveLength(3);
    });

    test('rows as children', () => {
      const elem = mount(
        <Table columns={tableColumns}>
          <TableRow data={tableData[0]} />
          <TableRow data={tableData[1]} />
        </Table>
      );

      expect(elem.find(TableRow)).toHaveLength(2);
      expect(
        elem
          .find(TableRow)
          .at(0)
          .prop('columns')
      ).toEqual(tableColumns);
    });
  });

  describe('props', () => {
    test('placeholder', () => {
      const elem = mount(<Table placeholder="Empty" columns={tableColumns} />);
      expect(elem.find(`.${styles.placeholder}`).text()).toEqual('Empty');
    });

    test('head', () => {
      expect(elem.find(TableHead)).toHaveLength(1);
      elem.setProps({ head: false });
      expect(elem.find(TableHead)).toHaveLength(0);
    });

    test('tbody', () => {
      expect(elem.find('tbody')).toHaveLength(1);
      elem.setProps({ tbody: false });
      expect(elem.find('tbody')).toHaveLength(0);
    });

    test('zebra', () => {
      expect(elem.find(`.${styles.zebra}`)).toHaveLength(1);
      elem.setProps({ zebra: false });
      expect(elem.find(`.${styles.zebra}`)).toHaveLength(0);
    });

    test('hovered', () => {
      expect(elem.find(`.${styles.hovered}`)).toHaveLength(1);
      elem.setProps({ hovered: false });
      expect(elem.find(`.${styles.hovered}`)).toHaveLength(0);
    });

    test('rowComponent', () => {
      elem.setProps({ rowComponent: CustomRow });
      expect(elem.find(CustomRow)).toHaveLength(3);
      expect(
        elem
          .find(CustomRow)
          .at(0)
          .text()
      ).toEqual(tableData[0].title);
    });

    test('headComponent', () => {
      elem.setProps({ head: true, headComponent: CustomHead });
      expect(elem.find(CustomHead)).toHaveLength(1);
      expect(elem.find(CustomHead).text()).toEqual(tableColumns[0].title);
    });
  });
});
