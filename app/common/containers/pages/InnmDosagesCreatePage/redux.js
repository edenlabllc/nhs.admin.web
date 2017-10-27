import { createInnmDosage } from 'redux/innm-dosages';
import { push } from 'react-router-redux';

export const onSubmit = (
  { form: { name: form }, name, ingredients = [], one: { ingredients: one } },
  active
) => dispatch => {
  const values = {
    form,
    name,
    ingredients: ingredients
      .map((ingredient, index) => mapIngredient(ingredient, index, active))
      .concat(mapIngredient(one, ingredients.length, active))
  };

  return dispatch(createInnmDosage(values)).then(({ error, payload }) => {
    if (!error) return dispatch(push(`/innm-dosages/${payload.data.id}`));
  });
};

const mapIngredient = (
  {
    id: { name: id },
    numerator_value,
    numerator_unit: { name: numerator_unit },
    denumerator_unit: { name: denumerator_unit }
  },
  index,
  active
) => ({
  id,
  is_primary: index === active,
  dosage: {
    numerator_value: parseFloat(numerator_value, 10),
    denumerator_value: 1,
    numerator_unit,
    denumerator_unit
  }
});
