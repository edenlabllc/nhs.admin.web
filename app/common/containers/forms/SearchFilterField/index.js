import React, { Component } from "react";
import withStyles from "withStyles";
import { connect } from "react-redux";
import { change, Field } from "redux-form";

import FieldInput from "components/reduxForm/FieldInput";
import Select from "components/Select";

import styles from "./styles.scss";

@withStyles(styles)
@connect(null, { change })
export default class SearchFilterField extends Component {
  state = {
    activeFilter: this.activeFilter
  };

  componentDidMount() {
    this.initForm();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeFilter !== prevState.activeFilter) {
      this.clearField(prevState.activeFilter);
    }
  }

  render() {
    const {
      placeholder,
      filters,
      hasSelect = true,
      labelText,
      requiredStar
    } = this.props;
    const { activeFilter } = this.state;

    const { name, validate } = filters.find(
      ({ name }) => name === activeFilter
    );

    return (
      <div className={styles.search}>
        <div className={styles.search__input}>
          <Field
            name={name}
            type="text"
            label_bold
            requiredStar={requiredStar}
            placeholder={placeholder}
            labelText={labelText}
            component={FieldInput}
            validate={validate ? [validate] : undefined}
          />
        </div>
        {hasSelect && (
          <div className={styles.search__select}>
            <Select
              active={activeFilter}
              options={filters}
              onChange={filter => this.setState({ activeFilter: filter })}
            />
          </div>
        )}
      </div>
    );
  }

  initForm() {
    const { initFields, query } = this.props;
    const { activeFilter } = this;

    const values = { [activeFilter]: query[activeFilter] };

    initFields(values);
  }

  get activeFilter() {
    const { query, filters } = this.props;

    const [defaultFilter] = filters;
    const filter = filters.find(({ name }) =>
      Object.hasOwnProperty.call(query, name)
    );

    const { name } = filter || defaultFilter;

    return name;
  }

  clearField(name) {
    this.props.change("search-form", name, null);
  }
}
