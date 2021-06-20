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

```js
import { createStoreon } from 'storeon-connect';

const count = (store) => {
  // Initial state
  store.on('@init', () => ({ count: 0 }));
  // Reducers returns only changed part of the state
  store.on('increment', ({ count }) => ({ count: count + 1 }));
};

const { getState, dispatch, connect } = createStoreon([count]);

const output = document.querySelector('#output');
const button = document.querySelector('#button');

// Subscribes for state property "count"
connect('count', ({ count }) => {
  output.textContent = `${count}`;
});

button.addEventListener('click', () => {
  // Emit event
  dispatch('increment');
});
```

## License

[MIT](./LICENSE)
