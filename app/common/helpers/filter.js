export default (filter, { location, router }) => {
  const newFilter = {
    ...location.query,
    ...filter,
  };

  const query = Object.keys(newFilter).reduce((target, key) => {
    if (newFilter[key]) {
      target[key] = newFilter[key]; // eslint-disable-line
    }

    return target;
  }, { });

  router.push({
    ...location,
    query,
  });
};
