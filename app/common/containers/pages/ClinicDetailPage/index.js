import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1, H3 } from 'components/Title';
import Line from 'components/Line';

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

        <ul className={styles.list}>
          {clinic.addresses.map((item, i) => (
            <li key={i}>
              {item.settlement}, {item.street} {item.building},
              ap. {item.apartment} ({item.zip})

              <span>
                Area: {item.area}, region: {item.region}
              </span>
            </li>
          ))}
        </ul>

        <Line />

        <H3>KVEDs:</H3>

        <ul className={styles['line-list']}>
          {clinic.kved.map((name, i) => (
            <li key={i}>{name}{i !== (clinic.kved.length - 1) && ','}</li>
          ))}
        </ul>

        <Line />

        <div className={styles.boxes}>
          <div>
            <H3>Accreditation</H3>

            <dl>
              <dt>Order No.</dt>
              <dd>
                <u className={styles.upper}>{accreditation.order_no}</u>
              </dd>

              <dt>Category</dt>
              <dd>{accreditation.category}</dd>

              <dt>Expiry date</dt>
              <dd>{accreditation.expiry_date}</dd>

              <dt>Issued date</dt>
              <dd>{accreditation.issued_date}</dd>

              <dt>Order date</dt>
              <dd>{accreditation.order_date}</dd>
            </dl>
          </div>
          <div>
            <H3>Contacts</H3>

            <dl>
              <dt>Phones</dt>
              <dd>
                <ul className={styles['line-list']}>
                  {clinic.phones.map((phone, i) => (
                    <li key={i}>{phone.number}{i !== (clinic.phones.length - 1) && ','}</li>
                  ))}
                </ul>
              </dd>
              <dt>Emails</dt>
              <dd>none</dd>
            </dl>
          </div>
          <div>
            <H3>Other</H3>

            <dl>
              <dt>Active</dt>
              <dd>{clinic.active ? 'Yes' : 'No'}</dd>
              <dt>Type</dt>
              <dd>{clinic.type}</dd>
              <dt>Status</dt>
              <dd>{clinic.status}</dd>
            </dl>
          </div>
        </div>

        <Line />

        <H3>Licenses</H3>

        <ul className={styles.list}>
          {licenses.map((item, i) => (
            <li key={i}>
              <u className={styles.upper}>{item.license_number}</u>, KVED {item.kved}
              <p>{item.what_licensed}</p>
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

            <dl>
              <dt>User</dt>
              <dd>{clinic.inserted_by}</dd>
              <dt>Date</dt>
              <dd>{format(clinic.inserted_at, 'DD.MM.YYYY hh:mm')}</dd>
            </dl>
          </div>
          <div>
            <H3>Updated</H3>

            <dl>
              <dt>User</dt>
              <dd>{clinic.updated_by}</dd>
              <dt>Date</dt>
              <dd>{format(clinic.updated_at, 'DD.MM.YYYY hh:mm')}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
