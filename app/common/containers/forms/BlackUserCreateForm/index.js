import React from "react";
import { reduxForm, Field, getFormValues } from "redux-form";

import FieldInput from "components/reduxForm/FieldInput";
import Button from "components/Button";
import { FormRow, FormColumn } from "components/Form";

import ShowWithScope from "containers/blocks/ShowWithScope";

import { reduxFormValidate } from "react-nebo15-validate";

@reduxForm({
  form: "black-user-create-form",
  validate: reduxFormValidate({
    tax_id: {
      length: 10
    }
  })
})
export default class BlackUserCreateForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit = () => {}, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <FormColumn>
            <Field
              name="tax_id"
              labelText="ІНН Користувача"
              component={FieldInput}
              placeholder="2848165412"
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        <FormRow>
          <FormColumn>
            <Button
              to="/black-list-users"
              theme="border"
              color="blue"
              icon="back"
              block
            >
              Повернутися до списку
            </Button>
          </FormColumn>
          <FormColumn>
            <ShowWithScope scope="bl_user:write">
              <div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Збереження" : "Заблокувати користувача"}
                </Button>
              </div>
            </ShowWithScope>
          </FormColumn>
        </FormRow>
      </form>
    );
  }
}
