import { createStoreon } from 'storeon';
import { storeonConnect } from '..';

/**
 * @template E
 * @template S
 * @param {import('storeon').StoreonModule<S, E>[]} modules
 * @returns {import('..').StoreonConnect<S, E>}
 */
export const createStore = (modules) => {
  const store = createStoreon(modules);

  return storeonConnect(store);
};
