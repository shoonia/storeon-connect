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
const { getState, dispatch, connect } = storeonConnect(store);

connect('name', 'age', ({ name, age }) => { });
connect('cool', ({ cool }) => { });
connect(({ name, age, cool }) => { });

dispatch('set/user', { name: 'Bob', age: 100 });
dispatch('set/cool');

const { name, age, cool } = getState();
