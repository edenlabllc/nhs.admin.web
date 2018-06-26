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
    initialValues: {},
    showDetailedItems: false
  };

  render() {
    const { fields, location: { query }, handleSubmit } = this.props;
    const { initialValues, showDetailedItems } = this.state;
    const showDetailedItemsButton = fields.filter(i => i.detailed).length > 1;

    return (
      <SearchFormContainer
        initialValues={initialValues}
        onSubmit={this.updateFilters}
      >
        {fields
          .filter(item => !item.detailed || showDetailedItems)
          .map(({ component: Field, detailed = false, ...props }, index) => (
            <Field
              key={index}
              {...props}
              query={query}
              initFields={this.initFields}
            />
          ))}
        {showDetailedItemsButton && (
          <div className={styles.search}>
            <Button
              icon="search"
              theme="link"
              onClick={() =>
                this.setState(() => ({ showDetailedItems: !showDetailedItems }))
              }
            >
              Розширений пошук
            </Button>
          </div>
        )}
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

const SearchFormComponent = ({ handleSubmit, reset, router, children }) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <div className={styles.form__fields}>{children}</div>
    <Button theme="fill" type="submit">
      Застосувати пошук
    </Button>
    <div className={styles.form__button}>
      <Button
        onClick={() => {
          reset();
          router.push({
            ...location,
            query: {}
          });
        }}
        theme="border"
        type="button"
      >
        Скинути пошук
      </Button>
    </div>
  </form>
);

const SearchFormContainer = compose(
  withRouter,
  withStyles(styles),
  reduxForm({
    form: "search-form",
    enableReinitialize: false
  })
)(SearchFormComponent);
