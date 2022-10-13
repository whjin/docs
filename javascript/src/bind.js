Function.prototype.myBind = function (obj) {
  let arg = Array.prototype.slice.call(arguments, 1);
  let context = this;

  const bound = function (newArg) {
    arg = arg.concat(Array.prototype.slice.call(newArg));
    return context.apply(obj, arg);
  };

  // 寄生组合继承
  const F = function () {};
  F.prototype = context.prototype;
  bound.prototype = new F();
  return bound;
};
