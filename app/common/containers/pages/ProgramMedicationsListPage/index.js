import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import filter from "helpers/filter";

import { H1, H2 } from "components/Title";
import Pagination from "components/Pagination";
import Button from "components/Button";
import DictionaryValue from "containers/blocks/DictionaryValue";

import Table from "components/Table";
import ShowBy from "containers/blocks/ShowBy";
import ColoredText from "components/ColoredText";

import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import { getProgramMedications } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchProgramMedications } from "./redux";
import styles from "./styles.scss";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    title: "Знайти учасника програми",
    filters: [
      {
        name: "medical_program_id",
        title: "за ID медичної програми",
        validate: uuidValidate
      },
      {
        name: "medical_program_name",
        title: "за назвою медичної програми"
      },
      {
        name: "innm_dosage_id",
        title: "за ID Лікарської форми",
        validate: uuidValidate
      },
      {
        name: "innm_dosage_name",
        title: "за назвою Лікарської форми"
      },
      {
        name: "medication_id",
        title: "за ID Торгової Назви",
        validate: uuidValidate
      },
      { name: "medication_name", title: "за Торговою Назвою" }
    ]
  }
];

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchProgramMedications({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.ProgramMedicationsListPage,
  program_medications: getProgramMedications(
    state,
    state.pages.ProgramMedicationsListPage.program_medications
  )
}))
export default class ProgramMedicationsListPage extends React.Component {
  render() {
    const { program_medications = [], t, paging, location } = this.props;

    return (
      <div id="medication-list-page">
        <Helmet
          title="Учасники медичних программ"
          meta={[
            { property: "og:title", content: "Учасники медичних программ" }
          ]}
        />
        <div className={styles.header}>
          <H1>Перелік учасників медичних програм</H1>
          <div className={styles.header__btn}>
            <Button
              to="/program-medications/create"
              theme="border"
              size="small"
              color="orange"
              icon="add"
            >
              Додати учасника
            </Button>
          </div>
        </div>

        <div className={styles.search}>
          <H2>Пошук учасників програм</H2>
          <SearchForm fields={SEARCH_FIELDS} location={location} />
        </div>

        <div className={styles.showBy}>
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </div>

        <div id="medication-table" className={styles.table}>
          <Table
            columns={[
              { key: "medical_program_id", title: "ID\n медичної програми" },
              {
                key: "medical_program_name",
                title: "Назва медичної програми"
              },
              { key: "medication_name", title: "Торгівельне найменування" },
              { key: "medication_form", title: "Форма" },
              { key: "manufacturer", title: "Виробник" },
              { key: "reimbursement_amount", title: "Сума Відшкодування" },
              { key: "status", title: "Активний" },
              { key: "action", title: t("Action"), width: 100 }
            ]}
            data={program_medications.map(item => ({
              medical_program_id: <div>{item.medical_program.id}</div>,
              medical_program_name: <div>{item.medical_program.name}</div>,
              medication_name: <div>{item.medication.name}</div>,
              medication_form: (
                <div>
                  <DictionaryValue
                    dictionary="MEDICATION_FORM"
                    value={item.medication.form}
                  />
                </div>
              ),
              manufacturer: (
                <div>
                  {item.medication.manufacturer.name}{" "}
                  {item.medication.manufacturer.country}
                </div>
              ),
              reimbursement_amount: (
                <div>{item.reimbursement.reimbursement_amount}</div>
              ),
              status: (
                <div>
                  {item.is_active ? (
                    <ColoredText color="green">активна</ColoredText>
                  ) : (
                    <ColoredText color="red">неактивна</ColoredText>
                  )}
                </div>
              ),
              action: (
                <Button
                  id={`show-medical-programs-detail-button-${item.id}`}
                  theme="link"
                  to={`/program-medications/${item.id}`}
                >
                  {t("Details")}
                </Button>
              )
            }))}
          />
        </div>

        {paging.total_pages > 1 && (
          <Pagination
            currentPage={paging.page_number}
            totalPage={paging.total_pages}
            location={location}
            cb={() => {}}
          />
        )}
      </div>
    );
  }
}
