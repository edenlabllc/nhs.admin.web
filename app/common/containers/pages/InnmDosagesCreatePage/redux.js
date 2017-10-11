import { createInnmDosage } from 'redux/innm-dosages';
import { push } from 'react-router-redux';

export const onSubmit = (v, active) => dispatch => {
  const values = {
    form: v.form.name,
    name: v.name,
    ingredients: (v.ingredients || []).map(i => ({
      id: i.id.name,
      is_primary: false,
      dosage: {
        numerator_value: +i.numerator_value,
        numerator_unit: i.numerator_unit.name,
        denumerator_unit: i.denumerator_unit.name,
        denumerator_value: 1
      }
    }))
  };
  values.ingredients.push({
    id: v.one.ingredients.id.name,
    is_primary: false,
    dosage: {
      numerator_value: +v.one.ingredients.numerator_value,
      numerator_unit: v.one.ingredients.numerator_unit.name,
      denumerator_unit: v.one.ingredients.denumerator_unit.name,
      denumerator_value: 1
    }
  });
  values.ingredients[active].is_primary = true;

  return dispatch(createInnmDosage(values)).then(action => {
    if (action.error) {
      throw new Error();
    }
    return dispatch(push(`/innm-dosages/${action.payload.data.id}`));
  });
};
