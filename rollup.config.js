import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/view-assist-control-card.js',
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript(),
    terser(),
    {
      name: 'copy-to-component',
      writeBundle() {
        const source = path.resolve('dist/view-assist-control-card.js');
        const dest = path.resolve('custom_components/view_assist_control/www/view-assist-control-card.js');
        
        // Ensure directory exists
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        fs.copyFileSync(source, dest);
        console.log(`Copied build to ${dest}`);
      }
    }
  ],
};
