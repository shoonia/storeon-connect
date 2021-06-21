const { createStoreon } = require('storeon');
const { storeonConnect } = require('..');

module.exports = (modules) => {
  const store = createStoreon(modules);

  return storeonConnect(store);
};
