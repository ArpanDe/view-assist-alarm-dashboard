import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/main.ts',
  output: {
    file: 'custom_components/view_assist_control/www/view-assist-control-card.js',
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript(),
    terser(),
  ],
};
