import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
{
	input: 'src/bench.js',
	output: {
		format: 'iife',
    file: './bench/bench.js'
  },
	plugins: [
		resolve(),
		commonjs(),
		terser()
	]
},
{
	input: 'node_modules/lodash/lodash.js',
	output: {
		format: 'cjs',
    file: './bench/lodash.js'
  },
	plugins: [
	]
},
{
	input: 'node_modules/lodash/lodash.js',
	output: {
		format: 'cjs',
    file: './bench/lodash.min.js'
  },
	plugins: [
		terser()
	]
},
{
	input: 'node_modules/lodash-es/lodash.js',
	output: {
		format: 'esm',
    file: './bench/lodash.esm.js'
  },
	plugins: [
	]
},
{
	input: 'node_modules/lodash-es/lodash.js',
	output: {
		format: 'esm',
    file: './bench/lodash.esm.min.js'
  },
	plugins: [
		terser()
	]
}
];
