import React from 'react';
import { compose } from 'redux';
import withStyles from 'withStyles';
import { connect } from 'react-redux';
import Portal from 'react-portal';

import { dismissError } from 'redux/error';

import ShowMore from 'containers/blocks/ShowMore';

import { H3, H5 } from 'components/Title';

import styles from './styles.scss';

const ErrorMessage = ({ error, dismissError }) => (
  <Portal
    isOpened={!!error}
    onClose={dismissError}
    closeOnEsc
    closeOnOutsideClick
  >
    {error && (
      <div className={styles.root}>
        <H3>An error has occured</H3>
        <p className={styles.message}>{error.message}</p>

        <ShowMore name="Details" show_block>
          {error.invalid.map(({ entry, rules }) => (
            <div key={entry} className={styles.error}>
              <H5>{entry}</H5>
              <ul>
                {rules.map(({ rule, description }, index) => (
                  <li key={index}>
                    {rule}: {description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ShowMore>
      </div>
    )}
  </Portal>
);

export default compose(
  withStyles(styles),
  connect(({ error }) => ({ error }), { dismissError })
)(ErrorMessage);
