const { createStoreon } = require('../dist/es5.cjs');

describe('connect', () => {
  it('should run callback right after connect', () => {
    const spy = jest.fn();
    const { connect } = createStoreon([]);

    connect(spy);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({});
  });

  it('should run with current actual state', () => {
    const spy = jest.fn();

    const { connect } = createStoreon([
      (s) => {
        s.on('@init', () => {
          return { x: 0, y: 1 };
        });
      },
    ]);

    connect(spy);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ x: 0, y: 1 });
  });
});
