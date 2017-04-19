import * as fromDictionaries from 'redux/dictionaries';

export const fetchDictionaries = options => dispatch =>
  dispatch(fromDictionaries.fetchDictionaries(options))
  .then((action) => {
    if (action.error) throw action;
  });
