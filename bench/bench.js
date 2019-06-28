(function () {
	'use strict';

	const pTry = (fn, ...arguments_) => new Promise(resolve => {
		resolve(fn(...arguments_));
	});

	var pTry_1 = pTry;
	// TODO: remove this in the next major version
	var default_1 = pTry;
	pTry_1.default = default_1;

	const pLimit = concurrency => {
		if (concurrency < 1) {
			throw new TypeError('Expected `concurrency` to be a number from 1 and up');
		}

		const queue = [];
		let activeCount = 0;

		const next = () => {
			activeCount--;

			if (queue.length > 0) {
				queue.shift()();
			}
		};

		const run = (fn, resolve, ...args) => {
			activeCount++;

			const result = pTry_1(fn, ...args);

			resolve(result);

			result.then(next, next);
		};

		const enqueue = (fn, resolve, ...args) => {
			if (activeCount < concurrency) {
				run(fn, resolve, ...args);
			} else {
				queue.push(run.bind(null, fn, resolve, ...args));
			}
		};

		const generator = (fn, ...args) => new Promise(resolve => enqueue(fn, resolve, ...args));
		Object.defineProperties(generator, {
			activeCount: {
				get: () => activeCount
			},
			pendingCount: {
				get: () => queue.length
			}
		});

		return generator;
	};

	var pLimit_1 = pLimit;
	var default_1$1 = pLimit;
	pLimit_1.default = default_1$1;

	const shimport = window.__shimport__;

	const ITERATIONS = 1;
	const CONCURRENCY = 20;
	const TESTS = [
	  createTest('CJS: fetch -> eval -> lodash.js', './lodash.js', testCJS),
	  createTest('CJS: fetch -> eval -> lodash.min.js', './lodash.min.js', testCJS),
	  createTest('shimImport: fetch -> shimport -> eval -> lodash.esm.js', './lodash.esm.js', testShimport),
	  createTest('shimImport: fetch -> shimport -> eval -> lodash.esm.min.js', './lodash.esm.min.js', testShimport),
	  createTest('ESM: dynamic import -> lodash.esm.js', './lodash.esm.js', testESM),
	  createTest('ESM: dynamic import -> lodash.esm.min.js', './lodash.esm.min.js', testESM)
	];

	const limit = pLimit_1(CONCURRENCY);

	async function runTests() {
	  for (let i = 0; i < TESTS.length; i++) {
	    await runTest(TESTS[i]);
	  }
	}

	function createTest(name, url, fn) {
	  return { name, url, fn };
	}

	async function runTest({ name, url, fn }) {
	  console.log(`Running [${name}], ${ITERATIONS} times...`);

	  const tasks = [];
	  for (let i = 0; i < ITERATIONS; i++) {
	    tasks.push(limit(() => fn(`${url}?key=${Date.now()+i}`)));
	  }

	  const start = Date.now();
	  await Promise.all(tasks);
	  const timeElapsed = Date.now() - start;
	  console.log(`[${name}] took ${timeElapsed}ms`);
	}

	async function testCJS(url) {
	  const text = await fetch(url).then(res => res.text());
	  const cjsWrapper = `(function() { let exports = {}; let module = { exports }; ${text}; return exports; })();`;
	  return eval(cjsWrapper);
	}

	async function testESM(url) {
	  return Function(`return import('${url}')`)();
	}

	async function testShimport(url) {
	  return shimport.load(url);
	}

	runTests();

}());
