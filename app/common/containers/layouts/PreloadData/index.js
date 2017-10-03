import 'react';
import { provideHooks } from 'redial';

import { fetchDictionaries } from 'redux/dictionaries';
import { fetchInnms } from 'redux/innms';

export default provideHooks({
  fetch: ({ dispatch }) => Promise.all([
    dispatch(fetchDictionaries({}, { useCache: true })),
    dispatch(fetchInnms({}, { useCache: true })),
  ]),
})(({ children }) => (children));

