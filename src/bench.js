import plimit from 'p-limit';

const shimport = window.__shimport__;

const ITERATIONS = 500;
const CONCURRENCY = 20;
const TESTS = [
  createTest('CJS: fetch -> eval -> lodash.js', './lodash.js', testCJS),
  createTest('CJS: fetch -> eval -> lodash.min.js', './lodash.min.js', testCJS),
  createTest('shimImport: fetch -> shimport -> eval -> lodash.esm.js', './lodash.esm.js', testShimport),
  createTest('shimImport: fetch -> shimport -> eval -> lodash.esm.min.js', './lodash.esm.min.js', testShimport),
  createTest('ESM: dynamic import -> lodash.esm.js', './lodash.esm.js', testESM),
  createTest('ESM: dynamic import -> lodash.esm.min.js', './lodash.esm.min.js', testESM)
];

const limit = plimit(CONCURRENCY);

async function runTests() {
  let test;
  for (let i = 0; i < TESTS.length; i++) {
    test = TESTS[i];
    test.duration = await runTest(test);
  }

  TESTS.sort((a, b) => a.duration < b.duration ? -1 : 1);

  let slower;
  const fastest = TESTS[0];
  TESTS.forEach(({name, duration}, i) => {
    slower = i ? `, ${((1 - (fastest.duration / duration))*100).toFixed(2)}% slower than [${fastest.name}]` : '';
    console.log(`[${name}] took ${duration}ms${slower}`);
  });
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

  return timeElapsed;
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
