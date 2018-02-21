import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { withRouter } from "react-router";
import Helmet from "react-helmet";

import { H1 } from "components/Title";
import RegisterUploadForm from "containers/forms/RegisterUploadForm";
import BackLink from "containers/blocks/BackLink";

import { uploadRegister } from "redux/registers";
import { getDictionaryValues } from "reducers";

@withRouter
@translate()
@connect(
  state => ({
    registerTypes: getDictionaryValues(state, "REGISTER_TYPE")
  }),
  { uploadRegister }
)
export default class RegisterUploadPage extends React.Component {
  render() {
    const { uploadRegister = () => {}, registerTypes, router } = this.props;

    return (
      <div id="register-upload-page">
        <Helmet
          title="Сторінка завантаження файлу"
          meta={[
            { property: "og:title", content: "Сторінка завантаження файлу" }
          ]}
        />
        <BackLink onClick={() => router.push("/registers")}>
          Завантажити файл
        </BackLink>

        <RegisterUploadForm
          data={{ registerTypes }}
          onSubmit={v => uploadRegister(v).then(e => console.log(e, v))}
        />
      </div>
    );
  }
}
