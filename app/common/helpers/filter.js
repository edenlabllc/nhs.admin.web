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
  const [defaultFilter] = filters;

  const filter = filters.find(
    ({ names, name }) =>
      names
        ? names.every(name => query.hasOwnProperty(name))
        : query.hasOwnProperty(name)
  );

  const { names, name } = filter || defaultFilter;

  return names || name;
};

// TODO: Remove this after list pages refactoring
export default setFilter;
