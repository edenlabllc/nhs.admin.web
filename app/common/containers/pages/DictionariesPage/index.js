import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getDictionaries } from 'reducers';

import { fetchDictionaries } from 'redux/dictionaries';
import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDictionaries()),
})
@connect(state => ({
  dictionaries: getDictionaries(state),
}))
export default class DictionariesPage extends React.Component {
  render() {
    const { dictionaries = [], t } = this.props;

    return (
      <div id="dictionaries-page">
        <H1>{ t('Dictionaries') }</H1>
        {
          <div>
            <p>{ t('Select dictionary to edit') }</p>
            <div id="templates-table" className={styles.table}>
              <Table
                columns={[
                  { key: 'name', title: t('Dictionary Name') },
                  { key: 'edit', title: t('Edit') },
                ]}
                data={Object.keys(dictionaries).map(dictionaryName => ({
                  name: <div className={styles.name}>
                    { dictionaryName }
                  </div>,
                  edit: (<Button
                    id={`edit-template-button-${dictionaryName}`}
                    theme="link"
                    to={`/dictionaries/${dictionaryName}`}
                  >
                    { t('View Dictionary') }
                  </Button>),
                }))}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}
