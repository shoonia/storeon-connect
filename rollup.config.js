import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const babelPlugin = getBabelOutputPlugin({
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        useBuiltIns: 'entry',
        targets: 'defaults',
      },
    ],
  ],
});

export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/index.js',
      format: 'es',
    },
    {
      file: './dist/index.es5.js',
      format: 'es',
      plugins: [
        babelPlugin,
      ],
    },
    {
      file: './dist/index.cjs',
      format: 'cjs',
      plugins: [
        babelPlugin,
      ],
    },
  ],
};
