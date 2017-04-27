import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import FormPageWrapper from 'containers/blocks/FormPageWrapper';

import DictionaryForm from 'containers/forms/DictionaryForm';

import { getDictionary } from 'reducers';

import { fetchDictionaries, updateDictionary } from 'redux/dictionaries';
import styles from './styles.scss';

@withStyles(styles)
@translate()
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
  }
  onSave(values) {
    const { updateDictionary } = this.props;
    return updateDictionary(values.name, values);
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
    const { dictionary, params, t } = this.props;

    return (
      <FormPageWrapper id="dictionary-edit-page" title={t('Edit {{name}} dictionary', { name: params.name })} back="/dictionaries">
        <DictionaryForm
          initialValues={this.transformToForm(dictionary)}
          onSubmit={this.onSave}
        />
      </FormPageWrapper>
    );
  }
}
