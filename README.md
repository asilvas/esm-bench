# esm-bench

## Results

High level:

* CJS is 8-13% slower than native dynamic import of ES Modules (not counting preflight CORS requests)
* [shimport](https://github.com/Rich-Harris/shimport) is 39-42% slower than CJS
* [shimport](https://github.com/Rich-Harris/shimport) is 47% slower than native dynamic import of ES Modules

```
Running [CJS: fetch -> eval -> lodash.js], 500 times...
Running [CJS: fetch -> eval -> lodash.min.js], 500 times...
Running [shimImport: fetch -> shimport -> eval -> lodash.esm.js], 500 times...
Running [shimImport: fetch -> shimport -> eval -> lodash.esm.min.js], 500 times...
Running [ESM: dynamic import -> lodash.esm.js], 500 times...
Running [ESM: dynamic import -> lodash.esm.min.js], 500 times...
[ESM: dynamic import -> lodash.esm.min.js] took 5090ms
[CJS: fetch -> eval -> lodash.min.js] took 5564ms, 8.52% slower than [ESM: dynamic import -> lodash.esm.min.js]
[ESM: dynamic import -> lodash.esm.js] took 7675ms, 33.68% slower than [ESM: dynamic import -> lodash.esm.min.js]
[CJS: fetch -> eval -> lodash.js] took 8805ms, 42.19% slower than [ESM: dynamic import -> lodash.esm.min.js]
[shimImport: fetch -> shimport -> eval -> lodash.esm.min.js] took 9544ms, 46.67% slower than [ESM: dynamic import -> lodash.esm.min.js]
[shimImport: fetch -> shimport -> eval -> lodash.esm.js] took 14274ms, 64.34% slower than [ESM: dynamic import -> lodash.esm.min.js]
```

_* results taken from Chrome v77_


## Testing

```
git clone git@github.com:asilvas/esm-bench.git
cd esm-bench
npm i
npm start
```

Navigate browser to `http://localhost:8080` and open console.
