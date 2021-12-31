import { existsSync, rmSync } from 'fs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

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

if (existsSync('dist')) {
  rmSync('dist', { recursive: true });
}

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
      interop: false,
      esModule: false,
      plugins: [
        babelPlugin,
      ],
    },
  ],
  plugins: [
    terser(),
  ],
};
