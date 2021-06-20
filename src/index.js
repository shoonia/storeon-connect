import { createStoreon as core } from 'storeon';

export let createStoreon = (modules) => {
  let { dispatch, get, on } = core(modules);

  let subs = [];

  on('@changed', (state, changes) => {
    subs.forEach((sub) => {
      let changesInKeys = sub.keys.some((key) => key in changes);

      if (changesInKeys) {
        sub.cb(state);
      }
    });
  });

  return {
    getState: get,
    dispatch,

    connect(...keys) {
      let cb = keys.pop();

      subs.push({ keys, cb });

      return () => {
        subs = subs.filter((s) => s.cb !== cb);
      };
    },
  };
};
