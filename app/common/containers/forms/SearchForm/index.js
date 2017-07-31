import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field, change, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import Select from 'components/Select';

import FieldInput from 'components/reduxForm/FieldInput';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  form: 'search-form',
  enableReinitialize: true,
})
@connect(state => ({
  values: getFormValues('search-form')(state),
}), { change })
export default class SearchForm extends React.Component {
  state = {
    active: null,
  };

  componentWillMount() {
    this.setState({ active: this.props.active || this.props.items[0].name });
  }

  onSelect(active) {
    const { values = {}, change } = this.props;

    this.setState({ active });
    Object.keys(values).forEach(key => change('search-form', key, ''));
  }

  render() {
    const { handleSubmit, placeholder, items = [], children } = this.props;
    const { active } = this.state;

    return (
      <form className={styles.search} onSubmit={handleSubmit}>
        <div className={styles.search__input}>
          {
            items.map(item => (
              active === item.name && <Field
                type="text"
                key={item.name}
                placeholder={placeholder}
                name={item.name}
                component={FieldInput}
              />
            ))
          }
        </div>
        <div className={styles.search__select}>
          <Select
            active={active}
            options={items}
            onChange={active => this.onSelect(active)}
          />
        </div>

        <div className={styles.search__content}>
          {children}
        </div>
      </form>
    );
  }
}
