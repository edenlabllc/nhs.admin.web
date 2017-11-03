export const setFilter = (filter, { location, router }) => {
  const newFilter = {
    ...location.query,
    ...filter,
    page: 1
  };

  const query = Object.keys(newFilter).reduce((target, key) => {
    if (newFilter[key]) {
      target[key] = newFilter[key]; // eslint-disable-line
    }

    return target;
  }, {});

  router.push({
    ...location,
    query
  });
};

export const getFilter = ({ location: { query } }, filters) => {
  const [{ name: defaultFilter }] = filters;

  const filter = filters[0].names
    ? Object.keys(query).filter(key =>
        filters[0].names.some(item => item === key)
      )
    : Object.keys(query).find(key => filters.some(({ name }) => name === key));

  return filter || defaultFilter;
};

// TODO: Remove this after list pages refactoring
export default setFilter;
