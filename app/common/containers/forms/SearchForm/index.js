import React, { Component } from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import withStyles from "withStyles";
import { reduxForm, change, getFormValues } from "redux-form";
import Button from "components/Button";

import { FormRow, FormColumn } from "components/Form";

import styles from "./styles.scss";

@withRouter
export default class SearchForm extends Component {
  state = {
    initialValues: {}
  };

  render() {
    const { fields, location: { query }, handleSubmit } = this.props;
    const { initialValues } = this.state;

    return (
      <SearchFormContainer
        initialValues={initialValues}
        onSubmit={this.updateFilters}
      >
        {fields.map(({ component: Field, ...props }, index) => (
          <Field
            key={index}
            {...props}
            query={query}
            initFields={this.initFields}
          />
        ))}
      </SearchFormContainer>
    );
  }

  initFields = nextValues => {
    this.setState(({ initialValues }) => ({
      initialValues: { ...initialValues, ...nextValues }
    }));
  };

  updateFilters = values => {
    const { location: { query, ...location }, router } = this.props;

    this.setState({ initialValues: values });

    const nextQuery = Object.entries({ ...query, ...values })
      .filter(([_, value]) => typeof value === "boolean" || Boolean(value))
      .reduce(
        (query, [key, value]) => Object.assign(query, { [key]: value }),
        {}
      );

    router.push({
      ...location,
      query: { ...nextQuery, page: 1 }
    });
  };
}

const SearchFormComponent = ({ handleSubmit, children }) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <div className={styles.form__fields}>{children}</div>
    <Button theme="fill" type="submit">
      Застусувати пошук
    </Button>
  </form>
);

const SearchFormContainer = compose(
  withStyles(styles),
  reduxForm({
    form: "search-form",
    enableReinitialize: true
  })
)(SearchFormComponent);
