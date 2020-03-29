const genereteUniqueId = require('../../src/utils/genereteUniqueId');

describe('Generate unique ID', () => {
  it('should generate a unique ID', () => {
    const id = genereteUniqueId();
    expect(id).toHaveLength(8);
  });
});