import * as fromDictionaries from 'redux/dictionaries';

export const fetchDictionaries = () => dispatch =>
  dispatch(fromDictionaries.fetchDictionaries())
  .then((action) => {
    if (action.error) throw action;
  });
