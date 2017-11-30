import React from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { provideHooks } from "redial";
import withStyles from "withStyles";
import Helmet from "react-helmet";

import Line from "components/Line";
import DataList from "components/DataList";
import InlineList from "components/InlineList";
import Button from "components/Button";

import BackLink from "containers/blocks/BackLink";
import DictionaryValue from "containers/blocks/DictionaryValue";

import { fetchEmployee } from "./redux";

import styles from "./style.scss";

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchEmployee(id))
})
@connect(state => state.pages.PendingEmployeeDetailPage)
export default class PendingEmployeeDetailPage extends React.Component {
  render() {
    const { employee = {}, t } = this.props;

    const fullName = `${employee.party.last_name} ${
      employee.party.first_name
    } ${employee.party.second_name}`;

    return (
      <div id="pending-employee-detail-page">
        <Helmet
          title={`${t("Employee")} - ${fullName}`}
          meta={[
            { property: "og:title", content: `${t("Employee")} - ${fullName}` }
          ]}
        />

        <BackLink to="/pending-employees">
          {t("Back to pending employees list")}
        </BackLink>

        <Line />

        <div className={styles.main}>
          <DataList
            list={[
              { name: t("Employee request ID"), value: employee.id },
              {
                name: t("Date registration"),
                value: format(employee.inserted_at, "DD/MM/YYYY")
              },
              {
                name: t("Employee type"),
                value: (
                  <DictionaryValue
                    dictionary="EMPLOYEE_TYPE"
                    value={employee.employee_type}
                  />
                )
              }
            ]}
          />

          <Line />

          <div className={styles.strong}>
            <DataList
              theme="small"
              list={[
                {
                  name: t("Position"),
                  value: (
                    <DictionaryValue
                      dictionary="POSITION"
                      value={employee.position}
                    />
                  )
                },
                { name: t("Full name"), value: fullName },
                {
                  name: t("Phones"),
                  value: (
                    <InlineList
                      list={employee.party.phones.map(item => item.number)}
                    />
                  )
                }
              ]}
            />
          </div>

          <Line />

          <DataList
            theme="min"
            list={[
              { name: t("legal entity id"), value: employee.legal_entity_id },
              { name: t("Legal entity"), value: employee.legal_entity_name },
              { name: t("edrpou"), value: employee.edrpou }
            ]}
          />

          <div className={styles.buttons}>
            <Button
              onClick={() => this.props.history.goBack()}
              theme="border"
              color="blue"
              icon="back"
              block
            >
              {t("Back to list")}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
