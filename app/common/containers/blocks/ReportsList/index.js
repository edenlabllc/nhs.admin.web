import React from 'react';
import format from 'date-fns/format';
import { translate } from 'react-i18next';
import withStyles from 'withStyles';

import Button from 'components/Button';
import Table from 'components/Table';

import styles from './styles.scss';

@withStyles(styles)
@translate()
export default class ReportsList extends React.Component {
  render() {
    const { reports = [], t } = this.props;

    return (
      <div id="reports-table" className={styles.table}>
        <Table
          columns={[
            { key: 'date', title: t('Created date') },
            { key: 'public_url', title: t('Link') },
          ]}
          data={reports.map(i => ({
            date: format(i.inserted_at, 'DD/MM/YYYY'),
            public_url: (
              <Button theme="link" to={i.public_url} target="__blank">
                {t('Download')}
              </Button>
            ),
          }))}
        />
      </div>
    );
  }
}
