import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { provideHooks } from "redial";
import Helmet from "react-helmet";

import { H1, H2 } from "components/Title";
import { ListTable, ListShowBy } from "components/List";
import BackLink from "containers/blocks/BackLink";

import { ListHeader } from "components/List";
import Line from "components/Line";

import { getRegisters } from "reducers";
import { PERSON_TYPE, REGISTER_STATUS } from "helpers/enums";
import { fetchRegisters } from "redux/registers";

const RegistersErrorsPage = ({
  register = {},
  paging = {},
  location,
  router
}) => (
  <div id="files-list-page">
    <Helmet
      title="реєстру"
      meta={[{ property: "og:title", content: "Помилки реєстру" }]}
    />
    <BackLink onClick={() => router.push("/registers")}>
      Повернутися до переліку файлів
    </BackLink>
    <Line />
    <div>
      {register.errors &&
        register.errors.map((item, key) => <div key={key}>{item}</div>)}
    </div>
  </div>
);

export default compose(
  withRouter,
  provideHooks({
    fetch: ({ dispatch, params: { id } }) =>
      dispatch(
        fetchRegisters({
          id
        })
      )
  }),
  connect((state, location) => ({
    register: getRegisters(state, [location.params.id])[0]
  }))
)(RegistersErrorsPage);
