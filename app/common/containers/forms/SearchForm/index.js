import React, { Component } from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import withStyles from "withStyles";
import { reduxForm } from "redux-form";
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
    const { fields, location: { query }, router } = this.props;
    const { initialValues, showDetailedItems } = this.state;
    const showDetailedItemsButton = fields.filter(i => i.detailed).length > 1;

    return (
      <SearchFormContainer
        initialValues={initialValues}
        onSubmit={this.updateFilters}
      >
        <div className={styles.inputs}>
          {fields
            .filter(item => !item.detailed)
            .map(({ component: Field, detailed = false, ...props }, index) => (
              <Field
                key={index}
                {...props}
                query={query}
                initFields={this.initFields}
              />
            ))}
        </div>
        {showDetailedItemsButton && (
          <div className={styles.search}>
            <Button
              icon="search"
              theme="link"
              onClick={() =>
                this.setState(() => ({
                  showDetailedItems: !showDetailedItems
                }))
              }
              type="button"
            >
              Розширений пошук
            </Button>
          </div>
        )}
        <div className={styles.buttonGroup}>
          <Button theme="fill" type="submit">
            Застосувати пошук
          </Button>
          <div className={styles.button}>
            <Button
              onClick={() => {
                this.setState({ initialValues: {} });
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
        </div>
        {showDetailedItems && (
          <div className={styles.fields}>
            {fields
              .filter(item => item.detailed)
              .map(({ component: Field, detailed = true, ...props }, index) => (
                <Field
                  key={index}
                  {...props}
                  query={query}
                  initFields={this.initFields}
                />
              ))}
            <div className={styles.buttonGroup}>
              <Button theme="fill" type="submit">
                Застосувати пошук
              </Button>
              <div className={styles.button}>
                <Button
                  onClick={() => {
                    this.setState({ initialValues: {} });
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
            </div>
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

    if (this.state.showDetailedItems) {
      this.setState(({ showDetailedItems }) => ({
        showDetailedItems: !showDetailedItems
      }));
    }
  };
}

const SearchFormComponent = ({ handleSubmit, children }) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    {children}
  </form>
);

const SearchFormContainer = compose(
  withRouter,
  withStyles(styles),
  reduxForm({
    form: "search-form",
    enableReinitialize: true
  })
)(SearchFormComponent);
