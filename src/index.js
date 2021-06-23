export let storeonConnect = (store) => {
  let subs = [];

  store.on('@changed', (state, changes) => {
    subs.forEach((sub) => {
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

    connect(...keys) {
      let cb = keys.pop();

      if (keys.length > 0) {
        subs.push({ keys, cb });
      }

      cb(store.get());

      return () => {
        subs = subs.filter((s) => s.cb !== cb);
      };
    },
  };
};
