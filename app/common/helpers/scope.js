
export const hasScope = (scopeA = '', scopeB = '') => {
  const scopeAArr = !Array.isArray(scopeA) ? scopeA.split(' ') : scopeA;
  const scopeBArr = !Array.isArray(scopeB) ? scopeB.split(' ') : scopeB;
  return !scopeBArr.some(i => scopeAArr.indexOf(i) === -1);
};
