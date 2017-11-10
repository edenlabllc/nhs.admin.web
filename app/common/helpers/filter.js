export const setFilter = (filter, { location, router }) => {
  const newFilter = {
    ...location.query,
    ...filter,
    page: 1
  };

  const query = Object.entries(newFilter)
    .filter(([_, value]) => value !== undefined && value != null) // eslint-disable-line
    .reduce(
      (query, [key, value]) => Object.assign(query, { [key]: value }),
      {}
    );

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
