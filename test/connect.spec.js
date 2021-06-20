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

  it('should run one time on init (no connect keys)', () => {
    const event = 'inc';
    const spy = jest.fn();

    const { connect, dispatch } = createStoreon([
      (s) => {
        s.on('@init', () => {
          return { x: 0 };
        });

        s.on(event, ({ x }) => {
          return { x: ++x };
        });
      },
    ]);

    connect(spy);
    dispatch(event);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith({ x: 0 });
  });

  it('should run by update state if the method connect have a key', () => {
    const event = 'inc';
    const spy = jest.fn();

    const { connect, dispatch } = createStoreon([
      (s) => {
        s.on('@init', () => {
          return { x: 0 };
        });

        s.on(event, ({ x }) => {
          return { x: ++x };
        });
      },
    ]);

    connect('x', spy);
    dispatch(event);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith({ x: 1 });
  });
});
