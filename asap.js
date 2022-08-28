// hack to suppress RNTL warnings bug

const nodePromise = Promise;

module.exports = (r) => nodePromise.resolve().then(r);