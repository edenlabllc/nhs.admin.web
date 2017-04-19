import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getDictionary } from 'reducers';

import { fetchDictionaries } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { name } }) => dispatch(fetchDictionaries({ name })),
})
@connect((state, params) => ({
  dictionary: getDictionary(state, params.params.name),
}))
export default class DictionariesPage extends React.Component {
  render() {
    const { dictionary, params } = this.props;
    console.log(dictionary, params);
    return (
      <div id="dictionaries-page">
        <H1>Dictionaries</H1>
        <p>Select dictionary to edit</p>
        <div id="templates-table" className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'value', title: 'Value' },
              { edit: 'edit', title: 'Edit' },
            ]}
            data={Object.keys(dictionary).map(i => ({
              name: <div className={styles.name}>
                {i}
              </div>,
              value: <div>
                {dictionary[i]}
              </div>,
              edit: <Button id={`edit-template-button-${i}`} theme="link" to={`/dictionaries/${i}`}>Edit&nbsp;Dictionary</Button>,
            }))}
          />
        </div>
      </div>
    );
  }
}

