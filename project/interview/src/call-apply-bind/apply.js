Function.prototype.myApply = function (context = window) {
  if (typeof this !== "function") {
    throw new TypeError("type error");
  }

  let result = null;
  context.fn = this;

  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;

  return result;
};
