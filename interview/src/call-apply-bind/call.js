Function.prototype.myCall = function (context = window) {
  if (typeof this !== "function") {
    throw new TypeError("type error");
  }
  let args = [...arguments].slice(1),
    result = null;
    
  context.fn = this;
  result = context.fn(...args);

  delete context.fn;

  return result;
};