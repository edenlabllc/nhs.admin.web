import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { withRouter } from 'react-router';
import withStyles from 'withStyles';
import Helmet from 'react-helmet';

import { H3 } from 'components/Title';
import Line from 'components/Line';
import DataList from 'components/DataList';
import Checkbox from 'components/Checkbox';
import InlineList from 'components/InlineList';
import Upper from 'components/Upper';
import { Confirm } from 'components/Popup';
import Button from 'components/Button';

import BlocksList from 'containers/blocks/BlocksList';
import BackLink from 'containers/blocks/BackLink';
import ColoredText from 'components/ColoredText';
import ShowMore from 'containers/blocks/ShowMore';
import DictionaryValue from 'containers/blocks/DictionaryValue';
import ShowWithScope from 'containers/blocks/ShowWithScope';

import { getProgramMedication } from 'reducers';

import { fetchProgramMedication } from './redux';
import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchProgramMedication(id))
})
@connect((state, { params: { id } }) => ({
  program_medication: getProgramMedication(state, id)
}))
export default class ProgramMedicationDetailPage extends React.Component {
  render() {
    const { program_medication = {}, t } = this.props;
    console.log(program_medication);

    return (
      <div id="clinic-detail-page">
        <Helmet
          title={program_medication.name}
          meta={[{ property: 'og:title', content: program_medication.name }]}
        />

        <BackLink onClick={() => this.props.router.goBack()}>
          Повернутись до списку учасників программ
        </BackLink>

        <Line />
        <div className={styles.row}>
          <div>
            <DataList
              list={[{ name: t('ID Учасника'), value: program_medication.id }]}
            />
          </div>
        </div>
        <Line />
        <div className={styles.row}>
          <DataList
            list={[
              {
                name: t('Торгова назва'),
                value: (
                  <div>
                    <div>
                      <div>{program_medication.medication.name}</div>
                      <div>
                        <ColoredText color="gray">
                          {`ID ${program_medication.medication.id}`}
                        </ColoredText>
                      </div>
                      <br />
                      <DictionaryValue
                        dictionary="MEDICATION_FORM"
                        value={program_medication.medication.form}
                      />
                      <br />
                      <p>
                        {`${program_medication.medication.ingredients[0].dosage
                          .denumerator_value} `}
                        {`${t('мість')} ${program_medication.medication
                          .ingredients[0].dosage
                          .numerator_value} ${program_medication.medication
                          .ingredients[0].dosage.numerator_unit}`}
                      </p>
                      <p>
                        {program_medication.medication.ingredients[0]
                          .is_primary && 'Діюча речовина'}
                      </p>
                      <br />
                      {program_medication.medication.ingredients.length > 1 && (
                        <ShowMore name="Показати інші складові" show_block>
                          {program_medication.medication.ingredients.map(
                            (i, key) => {
                              if (key === 0) return null;
                              return (
                                <div key={key}>
                                  <p>{i.dosage.denumerator_unit}</p>
                                  <p>
                                    {`${i.dosage.denumerator_value} `}
                                    {`містить ${i.dosage.numerator_value} ${i
                                      .dosage.numerator_unit}`}
                                  </p>
                                  <p>
                                    {innm_dosage.medication.ingredients[key]
                                      .is_primary && 'Діюча речовина'}
                                  </p>
                                  <br />
                                </div>
                              );
                            }
                          )}
                        </ShowMore>
                      )}
                      <ShowWithScope scope="medication:read">
                        <div className={styles.right}>
                          <BackLink
                            iconPosition="right"
                            to={`/medications/${program_medication.medication
                              .id}`}
                          >
                            Перейти до торгово назви
                          </BackLink>
                        </div>
                      </ShowWithScope>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
        <Line />
        <div className={styles.row}>
          <div>
            <DataList
              list={[
                {
                  name: t('Медична програма'),
                  value: (
                    <div>
                      {program_medication.medical_program.name}
                      <br />
                      <ColoredText color="gray">
                        {`ID ${program_medication.medical_program.id}`}
                      </ColoredText>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
        <Line />
        <div className={styles.row}>
          <div>
            <DataList
              list={[
                {
                  name: t('Відшкодування'),
                  value: (
                    <div>
                      Відсоток від вартості
                      <br />
                      {program_medication.reimbursement.reimbursement_amount %
                        100}
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
        <Line />
        <div className={styles.row}>
          <div>
            <Checkbox checked={program_medication.is_active} />
            Активна
          </div>
        </div>
        <br />
        <div className={styles.row}>
          <div>
            <Checkbox checked={program_medication.medication_request_allowed} />
            Medication request allowed
          </div>
        </div>
      </div>
    );
  }
}
