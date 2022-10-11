function myNew(Func) {
  let obj = {
    __proto__: Func.prototype,
  };
  Func.call(obj, ...arguments);
  return obj;
}
