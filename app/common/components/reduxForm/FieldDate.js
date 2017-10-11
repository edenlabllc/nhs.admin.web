import React from 'react';
import Input from 'components/Input';

import FieldInput from './FieldInput';

export default props => (
  <FieldInput
    component={Input}
    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
    {...props}
  />
);
