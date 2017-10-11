import React from 'react';
import Select from 'components/Select';

import FieldInput from './FieldInput';

const FieldSelect = props => (
  <FieldInput component={Select} {...props} active={props.input.value} />
);

export default FieldSelect;
