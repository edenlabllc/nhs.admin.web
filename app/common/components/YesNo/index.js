import React from 'react';
import { translate } from 'react-i18next';

export default translate()(({ bool, t }) => (
  <span>{(bool ? t('Yes') : t('No'))}</span>
));
