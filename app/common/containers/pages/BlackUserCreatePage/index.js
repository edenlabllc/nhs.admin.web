import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { withRouter } from "react-router";

import BackLink from "containers/blocks/BackLink";
import Line from "components/Line";
import BlackUserCreateForm from "containers/forms/BlackUserCreateForm";

import { onSubmit } from "./redux";

@withRouter
@connect(null, { onSubmit })
export default class BlackUserCreatePage extends React.Component {
  render() {
    const { router, onSubmit = () => {} } = this.props;

    return (
      <div id="black-user-create-page">
        <Helmet
          title="Додати користувача до чорного списку"
          meta={[
            {
              property: "og:title",
              content: "Додати користувача до чорного списку"
            }
          ]}
        />
        <BackLink onClick={() => router.push("/black-list-users")}>
          Повернутися до списку
        </BackLink>
        <Line />

        <BlackUserCreateForm onSubmit={onSubmit} />
      </div>
    );
  }
}
