import { createMedication } from 'redux/medications';
import { push } from 'react-router-redux';

export const onSubmit = (
  {
    name,
    code_atc,
    package_qty,
    package_min_qty,
    certificate,
    certificate_expired_at,
    form,
    manufacturer,
    container: {
      numerator_value,
      numerator_unit: { name: numerator_unit },
      denumerator_unit: { name: denumerator_unit }
    },
    ingredients = [],
    one: { ingredients: one }
  },
  active
) => dispatch => {
  const values = {
    name,
    code_atc,
    package_qty: parseFloat(package_qty, 10),
    package_min_qty: parseFloat(package_min_qty, 10),
    certificate,
    certificate_expired_at,
    form: form.name,
    manufacturer: {
      country: manufacturer.country.name,
      name: manufacturer.name
    },
    container: {
      numerator_value: parseFloat(numerator_value, 10),
      denumerator_value: 1,
      numerator_unit,
      denumerator_unit
    },
    ingredients: ingredients
      .map((ingredient, index) => mapIngredient(ingredient, index, active))
      .concat(mapIngredient(one, ingredients.length, active))
  };

  return dispatch(createMedication(values)).then(({ error, payload }) => {
    if (!error) return dispatch(push(`/medications/${payload.data.id}`));
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
