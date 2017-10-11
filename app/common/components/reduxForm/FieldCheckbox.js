import React from 'react';
import Checkbox from 'components/Checkbox';

import FieldInput from './FieldInput';

const FieldCheckbox = props => (
  <FieldInput
    component={Checkbox}
    {...props}
    type="checkbox"
    checked={props.input.value}
  />
);

export default FieldCheckbox;
