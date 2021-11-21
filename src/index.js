export let storeonConnect = (store) => {
  let subs = [];

  store.on('@set', (_, data) => data);

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
    dispatch: store.dispatch,
    getState: store.get,

    setState(data) {
      store.dispatch('@set', data);
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
