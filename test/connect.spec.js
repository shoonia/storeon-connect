const { createStoreon } = require('../dist/es5.cjs');

jest.setTimeout(5);

describe('connect', () => {
  it('should run callback right after connect', (done) => {
    const { connect } = createStoreon([]);

    connect((state) => {
      expect(state).toEqual({});
      done();
    });
  });
});
