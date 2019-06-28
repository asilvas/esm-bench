import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/bench.js',
	output: {
		file: 'bench/bench.js',
		format: 'iife'
	},
	plugins: [
		resolve(),
		commonjs()
	]
};
