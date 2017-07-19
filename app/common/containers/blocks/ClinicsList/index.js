import React from 'react';
import format from 'date-fns/format';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import withStyles from 'withStyles';

import Button from 'components/Button';
import Table from 'components/Table';

import styles from './styles.scss';

@withStyles(styles)
@translate()
export default class ClinicsList extends React.Component {
  render() {
    const { clinics = [], t } = this.props;

    return (
      <div id="clinics-table" className={styles.table}>
        <Table
          columns={[
            { key: 'date', title: t('Created date') },
            { key: 'name', title: t('Name') },
            { key: 'edrpou', title: t('edrpou') },
            { key: 'address', title: t('address') },
            { key: 'status', title: t('Status') },
            { key: 'action', title: t('Action'), width: 100 },
          ]}
          data={clinics.map(i => ({
            date: format(i.inserted_at, 'DD/MM/YYYY'),
            name: <div className={styles.name}>
              {i.name}
              <p>{t('edrpou')} {i.edrpou}</p>
            </div>,
            address: (
              <div>
                <div>{i.addresses[0].settlement}</div>
                {i.addresses[0].area}
              </div>
            ),
            status: (
              <span className={classnames(styles.status, i.nhs_verified && styles.status_verified)}>
                {i.nhs_verified ? t('Verified') : t('Not verified')}
              </span>
            ),
            edrpou: i.edrpou,
            action: (<Button id={`show-clinic-detail-button-${i.name}`} theme="link" to={`/clinics/${i.id}`}>{ t('Details') }</Button>),
          }))}
        />
      </div>
    );
  }
}
