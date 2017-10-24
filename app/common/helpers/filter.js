export const setFilter = (filter, { location, router }) => {
  const newFilter = {
    ...location.query,
    ...filter
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

  const filter = Object.keys(query).find(key =>
    filters.some(({ name }) => name === key)
  );

  return filter || defaultFilter;
};

// TODO: Remove this after list pages refactoring
export default setFilter;
