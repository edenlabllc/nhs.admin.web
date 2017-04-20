import * as fromDictionaries from 'redux/dictionaries';

export const fetchDictionaries = options => dispatch =>
  dispatch(fromDictionaries.fetchDictionaries(options))
  .then((action) => {
    if (action.error) throw action;
  });


export const updateDictionary = values => dispatch =>
  dispatch(fromDictionaries.updateDictionary(values.id, values))
    .then((action) => {
      if (action.error) throw action;
    });
