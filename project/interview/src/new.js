function New(fn) {
  let obj = {
    __proto__: fn.prototype,
  };
  fn.apply(obj, arguments);
  return obj;
}

function New(fn) {
  let obj = {
    __proto__: fn.prototype,
  };
  fn.call(obj, ...arguments);
  return obj;
}
