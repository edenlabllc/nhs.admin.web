import { createInnmDosage } from 'redux/innm-dosages';
import { push } from 'react-router';

export const onSubmit = v => (dispatch) => {
  const values = {
    form: v.form.name,
    name: v.name,
    ingredients: (v.ingredients || []).map(i => ({
      id: i.id.name,
      dosage: {
        numerator_value: i.numerator_value,
        numerator_unit: i.numerator_unit.name,
        denumerator_unit: i.denumerator_unit.name,
        denumerator_value: 1,
      },
    })),
  };
  values.ingredients.push(({
    id: v.one.ingredients.id.name,
    dosage: {
      numerator_value: v.one.ingredients.numerator_value,
      numerator_unit: v.one.ingredients.numerator_unit.name,
      denumerator_unit: v.one.ingredients.denumerator_unit.name,
      denumerator_value: 1,
    },
  }));

  console.log('v', values);
  return createInnmDosage(values).then((resp) => {
    console.log('resp', resp);
    return dispatch((push(`/innm-dosages/${resp.payload.data.id}`)));
  });
};

