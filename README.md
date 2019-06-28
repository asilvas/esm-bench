# esm-bench

## Results

High level:

* CJS is 11-17% slower than native dynamic import of ES Modules (not counting preflight CORS requests)
* [shimport](https://github.com/Rich-Harris/shimport) is 33-42% slower than CJS
* [shimport](https://github.com/Rich-Harris/shimport) is 49-52% slower than native dynamic import of ES Modules

```
Running [CJS: fetch -> eval -> lodash.js], 1000 times...
[CJS: fetch -> eval -> lodash.js] took 18174ms
Running [CJS: fetch -> eval -> lodash.min.js], 1000 times...
[CJS: fetch -> eval -> lodash.min.js] took 18617ms
Running [shimImport: fetch -> shimport -> eval -> lodash.esm.js], 1000 times...
[shimImport: fetch -> shimport -> eval -> lodash.esm.js] took 31522ms
Running [shimImport: fetch -> shimport -> eval -> lodash.esm.min.js], 1000 times...
[shimImport: fetch -> shimport -> eval -> lodash.esm.min.js] took 32030ms
Running [ESM: dynamic import -> lodash.esm.js], 1000 times...
[ESM: dynamic import -> lodash.esm.js] took 16238ms
Running [ESM: dynamic import -> lodash.esm.min.js], 1000 times...
[ESM: dynamic import -> lodash.esm.min.js] took 15635ms
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
