import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import DeclarationsChart from 'containers/blocks/DeclarationsChart';

import { fetchDeclarationsStat } from 'redux/reports';

import { getDeclarationsStatByArea } from 'reducers';

import styles from './styles.scss';

@withStyles(styles)
@connect((state, { id }) => ({
  data: getDeclarationsStatByArea(state, id),
}), { fetchDeclarationsStat })
export default class FieldsList extends React.Component {
  render() {
    const { data = [] } = this.props;

    if (data.length === 0) {
      return (
        <div className={styles.loading}>
          Loading...
        </div>
      );
    }

    return (
      <div>
        <DeclarationsChart
          data={data.map(item => ({
            name: item.date,
            all: item.declarations_total,
            open: item.declarations_created,
            closed: -item.declarations_closed,
          }))}
        />
      </div>
    );
  }
}
