import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import Button, { ButtonsGroup } from 'components/Button';
import FormPageWrapper from 'containers/blocks/FormPageWrapper';

import DictionaryForm from 'containers/forms/DictionaryForm';
import { FormButtons } from 'components/Form';

import { getDictionary } from 'reducers';

import { fetchDictionaries, updateDictionary } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { name } }) => dispatch(fetchDictionaries({ name })),
})
@connect((state, params) => ({
  dictionary: getDictionary(state, params.params.name),
}), {
  updateDictionary,
})
export default class DictionariesPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  state = {
    isEdit: false,
  };

  onEdit() {
    this.setState({
      isEdit: true,
    });
  }
  onSave(values) {
    const { updateDictionary } = this.props;
    console.log('submit', values, this.transformFromForm(values));

    this.setState({
      isEdit: false,
    });
    updateDictionary(values);
  }
  transformToForm(dictionary) {
    return {
      ...dictionary,
      values: Object.entries(dictionary.values).map(([key, value]) => ({
        key,
        value,
      })),
    };
  }
  transformFromForm(dictionary) {
    return {
      ...dictionary,
      values: dictionary.values.reduce((acc, cur) => ({
        ...acc,
        [cur.key]: cur.value,
      }), {}),
    };
  }

  render() {
    const { dictionary, params } = this.props;
    return (
      <FormPageWrapper id="dictionary-edit-page" title={`Edit ${params.name} dictionary`} back="/dictionaries">
        <div id="templates-table" className={styles.table}>
          <DictionaryForm
            initialValues={this.transformToForm(dictionary)}
            onSubmit={this.onSave}
            readOnly={!this.state.isEdit}
          />
        </div>
        <FormButtons>
          <ButtonsGroup>
            { !this.state.isEdit && <Button id="edit-dictionary-button" onClick={this.onEdit}>Edit</Button> }
          </ButtonsGroup>
        </FormButtons>
      </FormPageWrapper>
    );
  }
}

