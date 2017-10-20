import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import { H1 } from 'components/Title';
import { ListFilter, ListTable } from 'components/List';
import Table from 'components/Table';
import Button from 'components/Button';
import Select from 'components/Select';

import {
  getDictionaries,
  getDictionariesNames,
  getDictionariesLabels
} from 'reducers';

import { fetchDictionaries } from 'redux/dictionaries';

@translate()
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDictionaries())
})
@connect(
  state => ({
    dictionaries: getDictionaries(state),
    names: getDictionariesNames(state),
    labels: getDictionariesLabels(state)
  }),
  { fetchDictionaries }
)
export default class DictionariesPage extends React.Component {
  state = {
    name: null,
    label: []
  };

  render() {
    const { dictionaries = {}, names = [], labels = [], t } = this.props;

    return (
      <div id="dictionaries-page">
        <Helmet
          title={t('Dictionaries')}
          meta={[{ property: 'og:title', content: t('Dictionaries') }]}
        />

        <H1>{t('Dictionaries')}</H1>

        <div>
          <ListFilter>
            <div>
              <Select
                placeholder={t('Filter by name')}
                options={[{ name: null, title: t('All') }, ...names]}
                onChange={name => this.setState({ name })}
              />
            </div>
            <div>
              <Select
                placeholder={t('Filter by label')}
                options={labels.map(name => ({ name, title: name }))}
                multiple
                onChange={label => this.setState({ label })}
              />
            </div>
          </ListFilter>

          <p>{t('Select dictionary to edit')}</p>

          <ListTable id="templates-table">
            <Table
              columns={[
                { key: 'name', title: t('Dictionary Name') },
                { key: 'edit', title: t('Edit') }
              ]}
              data={Object.keys(dictionaries)
                .filter(
                  name =>
                    (this.state.name ? name === this.state.name : true) &&
                    (this.state.label.length
                      ? dictionaries[name].labels.some(
                          label => ~this.state.label.indexOf(label)
                        )
                      : true)
                )
                .map(dictionaryName => ({
                  name: <div>{dictionaryName}</div>,
                  edit: (
                    <Button
                      id={`edit-template-button-${dictionaryName}`}
                      theme="link"
                      to={`/dictionaries/${dictionaryName}`}
                    >
                      {t('View Dictionary')}
                    </Button>
                  )
                }))}
            />
          </ListTable>
        </div>
      </div>
    );
  }
}
