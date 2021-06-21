const store = require('./setup.js');

describe('connect', () => {
  it('should run callback right after connect', () => {
    const spy = jest.fn();

    const { connect } = store([]);

    connect(spy);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({});
  });

  it('should run with current actual state', () => {
    const spy = jest.fn();

    const { connect } = store([
      (store) => {
        store.on('@init', () => ({ x: 0, y: 1 }));
      },
    ]);

    connect(spy);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ x: 0, y: 1 });
  });

  it('should run one time on init (no connect keys)', () => {
    const event = 'inc';
    const spy = jest.fn();

    const { connect, dispatch } = store([
      (store) => {
        store.on('@init', () => ({ x: 0 }));
        store.on(event, ({ x }) => ({ x: ++x }));
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

    const { connect, dispatch } = store([
      (store) => {
        store.on('@init', () => ({ x: 0 }));
        store.on(event, ({ x }) => ({ x: ++x }));
      },
    ]);

    connect('x', spy);
    dispatch(event);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith({ x: 1 });
  });

  it('should connect for multiple keys', () => {
    const xEvent = 'x/event';
    const yEvent = 'y/event';
    const spy = jest.fn();

    const { connect, dispatch } = store([
      (store) => {
        store.on('@init', () => ({ x: 0, y: 0 }));
        store.on(xEvent, ({ x }) => ({ x: ++x }));
        store.on(yEvent, ({ y }) => ({ y: ++y }));
      },
    ]);

    connect('x', 'y', spy);
    dispatch(xEvent);
    dispatch(yEvent);

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenLastCalledWith({ x: 1, y: 1 });
  });

  it('should disconnect from store', () => {
    const event = 'event';
    const spy = jest.fn();

    const { connect, dispatch, getState } = store([
      (store) => {
        store.on('@init', () => ({ x: 0 }));
        store.on(event, ({ x }) => ({ x: ++x }));
      },
    ]);

    const disconnect = connect('x', spy);

    dispatch(event);
    disconnect();
    dispatch(event);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith({ x: 1 });
    expect(getState()).toEqual({ x: 2 });
  });
});
