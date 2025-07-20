export {};

declare global {
  var mock: (typeof import('bun:test'))['mock'];
  var describe: (typeof import('bun:test'))['describe'];
  var it: (typeof import('bun:test'))['it'];
  var expect: (typeof import('bun:test'))['expect'];
  var beforeEach: (typeof import('bun:test'))['beforeEach'];
  var afterEach: (typeof import('bun:test'))['afterEach'];
  var test: (typeof import('bun:test'))['test'];
}
