export let storeonConnect = (store) => {
  let SET_STATE = Symbol();
  let subs = [];

  store.on(SET_STATE, (_, data) => data);

  store.on('@changed', (state, changes) => {
    subs.some((sub) => {
      let changesInKeys = sub.keys.some(
        (key) => key in changes,
      );

      if (changesInKeys) {
        sub.cb(state);
      }
    });
  });

  return {
    getState: store.get,
    dispatch: store.dispatch,

    setState(data) {
      store.dispatch(SET_STATE, data);
    },

    connect(...keys) {
      let cb = keys.pop();

      if (keys.length) {
        subs.push({ keys, cb });
      }

      cb(store.get());

      return () => {
        subs = subs.filter((s) => s.cb !== cb);
      };
    },
  };
};
