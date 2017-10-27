import React from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';

import styles from './styles.scss';

@withStyles(styles)
export default class ShowMore extends React.Component {
  state = {
    show: false
  };

  render() {
    const { name, children, nav = false, show_block = nav } = this.props;
    const { show } = this.state;

    return (
      <div className={classnames(styles.main, nav && styles.main__nav)}>
        <button
          className={classnames(
            styles.button,
            show && styles.button_active,
            nav && styles.button_default
          )}
          onClick={() => this.setState({ show: !show })}
        >
          {name} <span>▾</span>
        </button>

        <div
          className={classnames(
            styles.more,
            show && styles.more_show,
            show_block && show && styles.more_show_block,
            nav && styles.more_nav
          )}
        >
          {children}
        </div>
      </div>
    );
  }
}
