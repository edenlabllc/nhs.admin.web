import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import Select from 'components/Select';

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
}), { fetchDictionaries })
export default class DictionariesPage extends React.Component {
  state = {
    name: null,
    label: [],
  };

  render() {
    const { dictionaries = {}, t } = this.props;

    const nameFilter = Object.keys(dictionaries).map(name => ({ name, title: name }));
    nameFilter.unshift({ name: null, title: 'All' });

    const labels = Object.keys(dictionaries).reduce((target, name) => {
      dictionaries[name].labels.forEach((label) => {
        if (target.indexOf(label) === -1) {
          target.push(label);
        }
      });

      return target;
    }, []);

    return (
      <div id="dictionaries-page">
        <H1>{ t('Dictionaries') }</H1>
        <div>
          <div className={styles.filter}>
            <div>
              <Select
                placeholder="Filter by name"
                options={nameFilter}
                onChange={name => this.setState({ name })}
              />
            </div>
            <div>
              <Select
                placeholder="Filter by label"
                options={labels.map(name => ({ name, title: name }))}
                multiple
                onChange={label => this.setState({ label })}
              />
            </div>
          </div>
          <p>{ t('Select dictionary to edit') }</p>
          <div id="templates-table" className={styles.table}>
            <Table
              columns={[
                { key: 'name', title: t('Dictionary Name') },
                { key: 'edit', title: t('Edit') },
              ]}
              data={Object.keys(dictionaries).filter(name => (
                (this.state.name ? name === this.state.name : true) &&
                (this.state.label.length ?
                  dictionaries[name].labels.some(label => ~this.state.label.indexOf(label)) :
                  true
                )
              )).map(dictionaryName => ({
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
      </div>
    );
  }
}
