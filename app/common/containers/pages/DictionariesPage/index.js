import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getDictionaries } from 'reducers';

import { fetchDictionaries } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDictionaries()),
})
@connect(state => ({
  dictionaries: getDictionaries(state, state.data.dictionaries),
}))
export default class DictionariesPage extends React.Component {
  render() {
    const { dictionaries = [] } = this.props;
    return (
      <div id="dictionaries-page">
        <H1>Dictionaries</H1>
        <p>Select dictionary to edit</p>
        {
          Object.keys(dictionaries).map((dictionary, key) =>
            <div key={key}>
              <div className={styles.table__title}>
                { dictionary }
              </div>
              <div id="templates-table" className={styles.table}>
                <Table
                  columns={[
                    { key: 'name', title: 'Name' },
                    { key: 'value', title: 'Value' },
                    { edit: 'value', title: 'Edit' },
                  ]}
                  data={Object.keys(dictionaries[dictionary]).map(i => ({
                    name: <div className={styles.name}>
                      {i}
                      {
                        console.log()
                      }
                    </div>,
                    value: <div>
                      {dictionaries[dictionary][i]}
                    </div>,
                    edit: (<Button
                      id={`edit-template-button-${i}`}
                      theme="link" to={`/dictionaries/${i}`}
                    >
                      Edit&nbsp;Dictionary
                    </Button>),
                  }))}
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
