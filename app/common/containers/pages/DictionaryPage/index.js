import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';
import FormPageWrapper from 'containers/blocks/FormPageWrapper';

import DictionaryForm from 'containers/forms/DictionaryForm';

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
  state = {
    onEdit: false,
  };

  onEdit() {
    this.setState({
      onEdit: !this.state.onEdit,
    });
  }
  onSave() {
    this.setState({
      onEdit: false,
    });
  }

  render() {
    const { dictionary, params } = this.props;
    return (
      <FormPageWrapper id="dictionary-edit-page" title={`Edit ${params.name} dictionary`} back="/dictionaries">
        {
        !this.state.onEdit && (<div>
          <div id="dictionaries-page">
            <H1>
              Dictionary page
              <Button id="edit-dictionary-button" theme="link" onClick={() => this.onEdit()}>Edit&nbsp;Dictionary</Button>
            </H1>
            <div id="templates-table" className={styles.table}>
              <Table
                columns={[
                  { key: 'name', title: 'Name' },
                  { key: 'value', title: 'Value' },
                ]}
                data={Object.keys(dictionary.values).map(i => ({
                  name: <div className={styles.name}>
                    {i}
                  </div>,
                  value: <div>{dictionary.values[i]}</div>,
                }))}
              />
            </div>
          </div>
        </div>)
        }
        {
          this.state.onEdit && (
            <div id="dictionaries-page">
              <H1>
                Update Dictionary page
                <Button id="edit-dictionary-button" theme="link" onClick={() => this.onSave()}>Save&nbsp;Dictionary</Button>
              </H1>
              <div id="templates-table" className={styles.table}>
                <DictionaryForm dictionary={dictionary} onSave={() => this.onSave} />
              </div>
            </div>
          )
        }
      </FormPageWrapper>
    );
  }
}

