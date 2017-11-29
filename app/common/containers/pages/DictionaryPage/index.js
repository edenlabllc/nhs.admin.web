import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import FormPageWrapper from "containers/blocks/FormPageWrapper";
import DictionaryForm from "containers/forms/DictionaryForm";

import { getDictionary, getScope } from "reducers";
import { hasScope } from "helpers/scope";

import { fetchDictionaries, updateDictionary } from "redux/dictionaries";
import styles from "./styles.scss";

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { name } }) =>
    dispatch(fetchDictionaries({ name }))
})
@connect(
  (state, params) => ({
    dictionary: getDictionary(state, params.params.name),
    currentScope: getScope(state)
  }),
  {
    updateDictionary
  }
)
export default class DictionariesPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.state = {
      write: false
    };
  }
  componentWillMount() {
    const write = hasScope("dictionary:write", this.props.currentScope);
    this.setState({ write });
  }

  onSave(values) {
    const { updateDictionary } = this.props;

    return updateDictionary(values.name, this.transformFromForm(values));
  }

  transformToForm(dictionary) {
    return {
      ...dictionary,
      values: Object.entries(dictionary.values).map(([key, value]) => ({
        key,
        value
      }))
    };
  }

  transformFromForm(dictionary) {
    return {
      ...dictionary,
      values: dictionary.values.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.key]: cur.value
        }),
        {}
      )
    };
  }

  render() {
    const { dictionary, params, t } = this.props;

    return (
      <FormPageWrapper
        id="dictionary-edit-page"
        title={t("Edit {{name}} dictionary", { name: params.name })}
        back="/dictionaries"
      >
        <Helmet
          title={t("Edit {{name}} dictionary", { name: params.name })}
          meta={[
            {
              property: "og:title",
              content: t("Edit {{name}} dictionary", { name: params.name })
            }
          ]}
        />
        <DictionaryForm
          initialValues={this.transformToForm(dictionary)}
          onSubmit={this.onSave}
          readOnly={!this.state.write}
        />
      </FormPageWrapper>
    );
  }
}
