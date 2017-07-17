import React from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';

import styles from './styles.scss';

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
    const { counts } = this.props;
    const { active } = this.state;

    return (
      <div className={styles.main}>
        <span className={styles.text}>
          Виводити по
        </span>
        { counts.map(item => (
          <button
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
