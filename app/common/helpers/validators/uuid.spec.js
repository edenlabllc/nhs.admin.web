import { expect } from 'chai';

import isUuidValid from './uuid';

describe('UUID validator', () => {
  it('Incorrect param.', () => {
    expect(isUuidValid(true)).to.equal(false);
    expect(isUuidValid(null)).to.equal(false);
    expect(isUuidValid('')).to.equal(false);
    expect(isUuidValid(123)).to.equal(false);
    expect(isUuidValid(['da'])).to.equal(false);
    expect(isUuidValid({ test: 1 })).to.equal(false);
    expect(isUuidValid('1-2-3-4-5')).to.equal(false);
  });

  it('Almost correct param.', () => {
    expect(isUuidValid('9d8d361-0892-42ec-beac-c582b5709dd4')).to.equal(false);
    expect(isUuidValid('39d8d361-0892-42ec-beac-c582b5709dO4')).to.equal(false);
    expect(isUuidValid('39D8D361-0892-42EC-BEAC-C582B5709DD4')).to.equal(false);
  });

  it('Correct param.', () => {
    expect(isUuidValid('39d8d361-0892-42ec-beac-c582b5709dd4')).to.equal(true);
    expect(isUuidValid('ca9b152c-8cd3-4fc5-9789-e82e55ede00b')).to.equal(true);
    expect(isUuidValid('ae2d58a9-1c5e-4298-b57c-298749542c2f')).to.equal(true);
  });
});
