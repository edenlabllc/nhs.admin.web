import 'react';
import { provideHooks } from 'redial';

import { fetchDictionaries } from 'redux/dictionaries';

export default provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDictionaries({}, { useCache: true })),
})(({ children }) => (children));
