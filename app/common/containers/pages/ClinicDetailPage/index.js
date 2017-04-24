import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1, H3 } from 'components/Title';
import Line from 'components/Line';
import DataList from 'components/DataList';
import InlineList from 'components/InlineList';

import AddressesList from 'containers/blocks/AddressesList';

import { getClinic } from 'reducers';

import { fetchClinic } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchClinic(id)),
})
@connect((state, { params: { id } }) => ({
  clinic: getClinic(state, id),
}))
export default class ClinicDetailPage extends React.Component {
  render() {
    const { clinic = { } } = this.props;
    const { accreditation, licenses } = clinic.medical_service_provider;

    return (
      <div id="clinic-detail-page">
        <H1>
          { clinic.name } ({ clinic.short_name })
          <span className={styles.edrpou}>edrpou: {clinic.edrpou}</span>
        </H1>

        <div className={styles.sub}>
          {clinic.legal_form}
        </div>

        <Line />
        <H3>Addresses:</H3>

        <AddressesList list={clinic.addresses} />

        <Line />

        <H3>KVEDs:</H3>

        <InlineList list={clinic.kved} />

        <Line />

        <div className={styles.boxes}>
          <div>
            <H3>Accreditation</H3>

            <DataList
              list={[
                {
                  name: 'Order No.',
                  value: (
                    <u className={styles.upper}>{accreditation.order_no}</u>
                  ),
                }, {
                  name: 'Category',
                  value: accreditation.category,
                }, {
                  name: 'Expiry date',
                  value: accreditation.expiry_date,
                }, {
                  name: 'Issued date',
                  value: accreditation.issued_date,
                }, {
                  name: 'Order date',
                  value: accreditation.order_date,
                },
              ]}
            />
          </div>
          <div>
            <H3>Contacts</H3>

            <DataList
              list={[
                {
                  name: 'Email',
                  value: 'none',
                }, {
                  name: 'Phones',
                  value: <InlineList list={clinic.phones.map(item => item.number)} />,
                },
              ]}
            />
          </div>
          <div>
            <H3>Other</H3>

            <DataList
              list={[
                {
                  name: 'Active',
                  value: clinic.active ? 'Yes' : 'No',
                }, {
                  name: 'Type',
                  value: clinic.type,
                }, {
                  name: 'Status',
                  value: clinic.status,
                },
              ]}
            />
          </div>
        </div>

        <Line />

        <H3>Licenses</H3>

        <ul className={styles.list}>
          {licenses.map((item, i) => (
            <li key={i}>
              <u className={styles.upper}>{item.license_number}</u>, KVED {item.kved}
              <p className={styles.gray}>{item.what_licensed}</p>
              <div>
                Issued: {item.issued_date}, expiry: {item.expiry_date}
              </div>
              <span>
                {item.issued_by}
              </span>
            </li>
          ))}
        </ul>

        <Line />

        <div className={styles.boxes}>
          <div>
            <H3>Inserted</H3>

            <DataList
              list={[
                {
                  name: 'User',
                  value: clinic.inserted_by,
                }, {
                  name: 'Date',
                  value: format(clinic.inserted_at, 'DD.MM.YYYY hh:mm'),
                },
              ]}
            />
          </div>
          <div>
            <H3>Updated</H3>

            <DataList
              list={[
                {
                  name: 'User',
                  value: clinic.updated_by,
                }, {
                  name: 'Date',
                  value: format(clinic.updated_at, 'DD.MM.YYYY hh:mm'),
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}
