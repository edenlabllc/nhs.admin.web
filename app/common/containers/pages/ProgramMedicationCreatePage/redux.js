import { push } from 'react-router-redux';

import * as fromProgramMedications from 'redux/program-medications';

export const onCreate = v => dispatch => {
  const values = {
    medication_id: v.medication_id,
    medical_program_id: v.medical_program.name,
    reimbursement: {
      type: v.reimbursement.type.name,
      reimbursement_amount: parseFloat(v.reimbursement.reimbursement_amount)
    }
  };
  console.log('values', v, values);
  dispatch(
    fromProgramMedications.createProgramMedication(values)
  ).then(action => {
    console.log('create', action);
    if (action.error) throw action;
    return dispatch(push(`/program-medications/${action.payload.id}`));
  });
};
