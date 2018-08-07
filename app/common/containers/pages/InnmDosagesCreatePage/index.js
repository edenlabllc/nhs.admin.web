import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import BackLink from "containers/blocks/BackLink";
import Line from "components/Line";
import InnmDosagesCreateForm from "containers/forms/InnmDosagesCreateForm";
import { getDictionary, getInnms } from "reducers";

import { onSubmit, onChangeSearchInnm } from "./redux";

@connect(
  state => ({
    innms: getInnms(state, state.pages.InnmDosagesCreatePage.innms),
    medication_unit: getDictionary(state, "MEDICATION_UNIT"),
    medication_form: getDictionary(state, "MEDICATION_FORM")
  }),
  { onSubmit, onChangeSearchInnm }
)
export default class InnmDosagesCreatePage extends React.Component {
  render() {
    const {
      router,
      innms = [],
      medication_unit = [],
      medication_form = [],
      onSubmit = () => {},
      onChangeSearchInnm = () => {}
    } = this.props;

    return (
      <div id="innm-dosages-create-page">
        <Helmet
          title="Сторінка створення лікарської форми"
          meta={[
            {
              property: "og:title",
              content: "Сторінка створення лікарської форми"
            }
          ]}
        />
        <BackLink onClick={() => router.goBack()}>
          Додати лікарську форму
        </BackLink>
        <Line />

        <InnmDosagesCreateForm
          onSubmit={onSubmit}
          onSearchInnms={onChangeSearchInnm}
          data={{ innms, medication_unit, medication_form }}
        />
      </div>
    );
  }
}
