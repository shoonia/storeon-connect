import { jest } from '@jest/globals';
import { createStore } from './setup.js';

describe('connect', () => {
  it('should run callback right after connect', () => {
    const spy = jest.fn();

    const { connect } = createStore([]);

    connect(spy);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({});
  });

  it('should run with current actual state', () => {
    const spy = jest.fn();

    const { connect } = createStore([
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

    const { connect, dispatch } = createStore([
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

    const { connect, dispatch } = createStore([
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

    const { connect, dispatch } = createStore([
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

  it('should run only by connected key', () => {
    const aEvent = 'a/event';
    const bEvent = 'b/event';
    const spy = jest.fn();

    const { connect, dispatch, getState } = createStore([
      (store) => {
        store.on('@init', () => ({ a: 0, b: 0 }));
        store.on(aEvent, ({ a }) => ({ a: ++a }));
        store.on(bEvent, ({ b }) => ({ b: ++b }));
      },
    ]);

    connect('a', spy);
    dispatch(aEvent);
    dispatch(bEvent);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith({ a: 1, b: 0 });
    expect(getState()).toEqual({ a: 1, b: 1 });
  });

  it('should disconnect from store', () => {
    const event = 'event';
    const spy = jest.fn();

    const { connect, dispatch, getState } = createStore([
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
