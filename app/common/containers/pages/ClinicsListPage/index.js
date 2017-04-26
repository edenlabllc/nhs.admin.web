import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1 } from 'components/Title';
import Table from 'components/Table';
import Button from 'components/Button';

import { getClinics } from 'reducers';

import { fetchClinics } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchClinics()),
})
@connect(state => ({
  ...state.pages.ClinicsListPage,
  clinics: getClinics(state, state.pages.ClinicsListPage.clinics),
}))
export default class ClinicsListPage extends React.Component {
  render() {
    const { clinics = [] } = this.props;

    return (
      <div id="clinics-list-page">
        <H1>Clinics</H1>
        <p>Select dictionary to edit</p>
        <div id="clinics-table" className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'type', title: 'Type' },
              { key: 'status', title: 'Status' },
              { key: 'active', title: 'Active', width: 100 },
              { key: 'action', title: 'Action', width: 100 },
            ]}
            data={clinics.map(i => ({
              name: <div className={styles.name}>
                {i.name}
                <p>{i.legal_form}</p>
              </div>,
              status: i.status,
              type: i.type,
              active: i.active ? 'Yes' : 'No',
              action: (<Button id={`show-clinic-detail-button-${i.name}`} theme="link" to={`/clinics/${i.id}`}>Details</Button>),
            }))}
          />
        </div>
      </div>
    );
  }
}
