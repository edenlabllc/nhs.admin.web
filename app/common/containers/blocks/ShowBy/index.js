import React from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';
import { translate } from 'react-i18next';

import styles from './styles.scss';

@translate()
@withStyles(styles)
export default class ShowBy extends React.Component {
  static defaultProps = {
    counts: [5, 20, 50],
    onChange: () => {},
  };

  state = {
    active: 5,
  };

  componentWillMount() {
    this.props.active && this.setState({ active: this.props.active });
  }

  onClick(count) {
    if (count === this.state.active) {
      return;
    }

    this.setState({ active: count }, () => this.props.onChange(count));
  }

  render() {
    const { counts, t } = this.props;
    const { active } = this.state;

    return (
      <div className={styles.main}>
        <span className={styles.text}>
          {t('Show by')}
        </span>
        { counts.map(item => (
          <button
            key={item}
            onClick={() => this.onClick(item)}
            className={classnames(styles.button, active === item && styles.button_active)}
          >
            {item}
          </button>
        )) }
      </div>
    );
  }
}
