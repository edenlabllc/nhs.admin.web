import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import Helmet from "react-helmet";

import filter from "helpers/filter";

import { ListHeader, ListShowBy, ListTable } from "components/List";
import { H1, H2 } from "components/Title";
import Pagination from "components/Pagination";
import Button from "components/Button";

import Table from "components/Table";
import ShowBy from "containers/blocks/ShowBy";
import Icon from "components/Icon";
import DictionaryValue from "containers/blocks/DictionaryValue";

import SearchForm from "containers/forms/SearchForm";

import { getMedications } from "reducers";

import { fetchMedications } from "./redux";
import uuidValidate from "../../../helpers/validators/uuid-validate";

const FILTER_PARAMS = [
  "id",
  "innm_dosage_id",
  "innm_dosage_name",
  "name",
  "form"
];

@withRouter
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchMedications({ page_size: 5, ...query }))
})
@connect(state => ({
  ...state.pages.MedicationsListPage,
  medications: getMedications(
    state,
    state.pages.MedicationsListPage.medications
  )
}))
export default class MedicationsListPage extends React.Component {
  get activeFilter() {
    const index = FILTER_PARAMS.indexOf(
      Object.keys(this.props.location.query).filter(
        key => ~FILTER_PARAMS.indexOf(key)
      )[0]
    );
    return FILTER_PARAMS[index !== -1 ? index : 0];
  }
  render() {
    const { medications = [], t, paging, location } = this.props;
    const activeFilter = this.activeFilter;

    return (
      <div id="medication-list-page">
        <Helmet
          title="Торгівельні найменування"
          meta={[{ property: "og:title", content: "Торгівельні найменування" }]}
        />

        <ListHeader
          button={
            <Button
              to="/medications/create"
              theme="border"
              size="small"
              color="orange"
              icon="add"
            >
              Створити торгівельне найменування
            </Button>
          }
        >
          <H1>Торгівельні найменування</H1>
        </ListHeader>

        <div>
          <H2>Пошук торгівельного найменування</H2>

          <SearchForm
            active={activeFilter}
            placeholder="Знайти торгівельне найменування"
            items={[
              { name: "id", title: t("за ID"), validate: uuidValidate },
              {
                name: "innm_dosage_id",
                title: t("за ID лікарської форми"),
                validate: uuidValidate
              },
              {
                name: "innm_dosage_name",
                title: t("за назвою лікарської форми")
              },
              { name: "name", title: t("за назвою") }
            ]}
            initialValues={{
              [activeFilter]: location.query[activeFilter]
            }}
            onSubmit={values =>
              filter(
                {
                  id: null,
                  innm_dosage_id: null,
                  innm_dosage_name: null,
                  name: null,
                  page: 1,
                  ...values
                },
                this.props
              )
            }
          />
        </div>

        <ListShowBy>
          <ShowBy
            active={Number(location.query.page_size) || 5}
            onChange={page_size => filter({ page_size, page: 1 }, this.props)}
          />
        </ListShowBy>

        <ListTable id="medication-table">
          <Table
            columns={[
              { key: "id", title: t("ID") },
              { key: "innm_dosage_id", title: t("ID лікарської форми") },
              { key: "name", title: t("Торгівельне найменування") },
              { key: "form", title: t("Форма /Виробник") },
              { key: "active", title: t("Активна") },
              { key: "action", title: t("Детально / Деактивація"), width: 200 }
            ]}
            data={medications.map(item => ({
              id: <div>{item.id}</div>,
              innm_dosage_id: (
                <div>{item.ingredients.filter(i => i.is_primary)[0].id}</div>
              ),
              name: <div>{item.name}</div>,
              form: (
                <div>
                  <DictionaryValue
                    dictionary="MEDICATION_FORM"
                    value={item.form}
                  />
                  <br />
                  {item.manufacturer.name}
                </div>
              ),
              active: (
                <div>{item.is_active && <Icon name="check-right" />}</div>
              ),
              action: (
                <Button
                  id={`show-medication-detail-button-${item.id}`}
                  theme="link"
                  to={`/medications/${item.id}`}
                >
                  {t("Details")}
                </Button>
              )
            }))}
          />
        </ListTable>

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
