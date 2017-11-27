import React from "react";
import format from "date-fns/format";
import { translate } from "react-i18next";

import { ListTable, ListStatus } from "components/List";
import Button from "components/Button";
import Table from "components/Table";

@translate()
export default class ClinicsList extends React.Component {
  render() {
    const { clinics = [], t } = this.props;

    return (
      <ListTable id="clinics-table">
        <Table
          columns={[
            { key: "date", title: t("Created date") },
            { key: "name", title: t("Name") },
            { key: "edrpou", title: t("edrpou") },
            { key: "address", title: t("address") },
            { key: "status", title: t("Status") },
            { key: "verification", title: t("Verification") },
            { key: "action", title: t("Action"), width: 100 }
          ]}
          data={clinics.map(i => ({
            date: format(i.inserted_at, "DD/MM/YYYY"),
            name: (
              <div>
                {i.name}
                <p>
                  {t("edrpou")} {i.edrpou}
                </p>
              </div>
            ),
            address: (
              <div>
                <div>{i.addresses[0].settlement}</div>
                {i.addresses[0].area}
              </div>
            ),
            status: (
              <ListStatus verified={i.nhs_verified}>
                {i.status === "ACTIVE" && t("LE Active")}
                {i.status === "CLOSED" && t("LE Closed")}
              </ListStatus>
            ),
            verification: (
              <ListStatus verified={i.nhs_verified}>
                {i.nhs_verified ? t("Verified") : t("Not verified")}
              </ListStatus>
            ),
            edrpou: i.edrpou,
            action: (
              <Button
                id={`show-clinic-detail-button-${i.name}`}
                theme="link"
                to={`/clinics/${i.id}`}
              >
                {t("Details")}
              </Button>
            )
          }))}
        />
      </ListTable>
    );
  }
}
