import React from "react";
import format from "date-fns/format";
import { translate } from "react-i18next";

import { ListTable } from "components/List";
import Button from "components/Button";
import Table from "components/Table";

@translate()
export default class ReportsList extends React.Component {
  render() {
    const { reports = [], t } = this.props;

    return (
      <ListTable id="reports-table">
        <Table
          columns={[
            { key: "date", title: t("Created date") },
            { key: "public_url", title: t("Link") }
          ]}
          data={reports.map(i => ({
            date: format(i.inserted_at, "DD/MM/YYYY"),
            public_url: (
              <Button theme="link" to={i.public_url} target="__blank">
                {t("Download")}
              </Button>
            )
          }))}
        />
      </ListTable>
    );
  }
}
