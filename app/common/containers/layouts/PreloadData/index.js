import 'react';
import { provideHooks } from 'redial';

import { fetchDictionaries } from 'redux/dictionaries';
import { fetchInnms } from 'redux/innms';
import { fetchInnmDosages } from 'redux/innm-dosages';
import { fetchMedicalPrograms } from 'redux/medical-programs';

const PreloadData = ({ children }) => children;

export default provideHooks({
  fetch: ({ dispatch }) =>
    Promise.all([
      dispatch(fetchDictionaries({}, { useCache: true })),
      dispatch(fetchInnms()),
      dispatch(fetchInnmDosages()),
      dispatch(fetchMedicalPrograms())
    ])
})(PreloadData);
