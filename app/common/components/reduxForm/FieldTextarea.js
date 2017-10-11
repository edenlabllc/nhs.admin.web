import React from 'react';
import Input from 'components/Input';

import FieldInput from './FieldInput';

const FieldTextarea = props => (
  <FieldInput component={Input} inputComponent="textarea" {...props} />
);

export default FieldTextarea;
