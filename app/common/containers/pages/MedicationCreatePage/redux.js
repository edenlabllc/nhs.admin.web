import { createMedication } from 'redux/medications';
import { push } from 'react-router-redux';

export const onSubmit = (v, active) => (dispatch) => {
  const values = {
    name: v.name,
    code_atc: v.code_atc,
    package_qty: +v.package_qty,
    package_min_qty: +v.package_min_qty,
    certificate: v.certificate,
    certificate_expired_at: v.certificate_expired_at,
    form: v.form.name,
    manufacturer: {
      country: v.manufacturer.country.name,
      name: v.manufacturer.name,
    },
    container: {
      numerator_value: +v.container.numerator_value,
      numerator_unit: v.container.numerator_unit.name,
      denumerator_unit: v.container.denumerator_unit.name,
      denumerator_value: 1,
    },
    ingredients: (v.ingredients || []).map(item => ({
      id: item.id.name,
      is_primary: false,
      dosage: {
        numerator_value: +item.numerator_value,
        numerator_unit: item.numerator_unit.name,
        denumerator_unit: item.denumerator_unit.name,
        denumerator_value: 1,
      },
    })),
  };
  values.ingredients.push(({
    id: v.one.ingredients.id.name,
    is_primary: false,
    dosage: {
      numerator_value: +v.one.ingredients.numerator_value,
      numerator_unit: v.one.ingredients.numerator_unit.name,
      denumerator_unit: v.one.ingredients.denumerator_unit.name,
      denumerator_value: 1,
    },
  }));

  values.ingredients[active].is_primary = true;
  return dispatch(createMedication(values)).then((action) => {
    if (action.error) {
      throw new Error();
    }
    return dispatch(push(`/medications/${action.payload.data.id}`));
  });
};

