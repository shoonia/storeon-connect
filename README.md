# storeon-connect

[![build](https://github.com/shoonia/storeon-connect/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/storeon-connect/actions/workflows/ci.yml)
[![npm version](https://badgen.net/npm/v/storeon-connect)](https://www.npmjs.com/package/storeon-connect)
[![minzip](https://badgen.net/bundlephobia/minzip/storeon-connect)](https://bundlephobia.com/result?p=storeon-connect)

A tiny connector for observes changes in [Storeon](https://github.com/storeon/storeon)

## How to use

```bash
npm i storeon-connect
#or
yarn add storeon-connect
```

## Example

**store.js**

```js
import { createStoreon } from 'storeon';

const count = (store) => {
  // Initial state
  store.on('@init', () => ({ count: 0 }));
  // Reducers returns only changed part of the state
  store.on('increment', ({ count }) => ({ count: count + 1 }));
};

export const store = createStoreon([count]);
```

```js
import { storeonConnect } from 'storeon-connect';
import { store } from './store.js';

const { getState, dispatch, connect } = storeonConnect(store);

const output = document.querySelector('#output');
const button = document.querySelector('#button');

// The callback function will be run on setup
// and each time when property "count" would change.
connect('count', ({ count }) => {
  output.textContent = `${count}`;
});

button.addEventListener('click', () => {
  // Emit event
  dispatch('increment');
});
```

## API

### storeonConnect

```js
const { getState, dispatch, connect } = storeonConnect(store);
```

- [Storeon store](https://github.com/storeon/storeon#store)
- [Storeon events](https://github.com/storeon/storeon#events)

### getState

Returns an object that holds the complete state of your app.

```js
const state = getState();
```

Syntax

```ts
function getState(): object
```

### dispatch

Emits an event with optional data.

```js
dispatch("event/type", { xyz: 123 });
```

Syntax

```ts
function dispatch(event: string, data?: any): void
```

### connect

Connects store state by property keys. It will return the function disconnect from the store.

```js
const disconnect = connect('key', (state) => { });

disconnect();
```

You can connect for multiple keys, the last argument must be a function.

```js
connect('key1', 'key2', (state) => { });
```

Runs callback function once.

```js
connect((state) => { });
```

Syntax

```ts
function connect(...args: [...keys: string[], handler: ConnectHandler]): Disconnect

type ConnectHandler = (state: object) => void | Promise<void>

type Disconnect = () => void
```

## License

[MIT](./LICENSE)
