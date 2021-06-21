export let storeonConnect = ({ dispatch, get, on }) => {
  let subs = [];

  on('@changed', (state, changes) => {
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
    getState: get,
    dispatch,

    connect(...keys) {
      let cb = keys.pop();

      if (keys.length > 0) {
        subs.push({ keys, cb });
      }

      cb(get());

      return () => {
        subs = subs.filter((s) => s.cb !== cb);
      };
    },
  };
};
