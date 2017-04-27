import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';
import { H1 } from 'components/Title';

import SystemConfigurationForm from 'containers/forms/SystemConfigurationForm';

import { getConfiguration } from 'reducers';

import { updateConfiguration } from 'redux/configuration';

import { fetchConfiguration } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchConfiguration()),
})
@connect(state => ({
  configuration: getConfiguration(state),
}), { updateConfiguration })
export default class SystemConfigurationPage extends React.Component {
  render() {
    const { configuration = {} } = this.props;

    return (
      <div id="system-configuration-page">
        <H1>System configuration</H1>

        <SystemConfigurationForm
          initialValues={configuration}
          onSubmit={values => (
            this.props.updateConfiguration(values)
          )}
        />
      </div>
    );
  }
}
