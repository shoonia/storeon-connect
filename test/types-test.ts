import { createStoreon, StoreonModule } from 'storeon';
import { storeonConnect } from '..';

interface IState {
  name: string;
  age: number;
  cool: boolean;
}

interface IEvents {
  'set/user': { name: string; age: number; };
  'set/cool': never;
}

const appModule: StoreonModule<IState, IEvents> = (store) => {
  store.on('@init', () => {
    return {
      name: '',
      age: 0,
      cool: true,
    };
  });

  store.on('set/user', (_, user) => user);
  store.on('set/cool', () => ({ cool: true }));
};

const store = createStoreon<IState, IEvents>([appModule]);
const { getState, setState, dispatch, connect } = storeonConnect(store);

const disconnect = connect('cool', ({ cool }) => { });
disconnect();

connect(() => {});
connect(async () => {});
connect('name', () => {});
connect('name', async () => {});
connect('name', 'age', ({ name, age }) => { });
connect(({ name, age, cool }) => { });

// @ts-expect-error
connect();
// @ts-expect-error
connect('x', () => {});
// @ts-expect-error
connect('age', ({ x }) => {});

dispatch('set/user', { name: 'Bob', age: 100 });
dispatch('set/cool');

// @ts-expect-error
dispatch();
// @ts-expect-error
dispatch('unknown');
// @ts-expect-error
dispatch('set/user', { x });

const { name, age, cool } = getState();

// @ts-expect-error
const { z } = getState();

setState({ name: 'Bob' });
setState({ name: 'Bob', age: 100, cool: true });

// @ts-expect-error
setState();
// @ts-expect-error
setState({ y: 100 });
