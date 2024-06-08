Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error("type error");
  }
  let self = this;
  let args = Array.prototype.slice.call(arguments, 1);

  const bound = function () {
    self.apply(
      this instanceof context ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  // 寄生组合继承
  const Fn = function () {};
  Fn.prototype = self.prototype;
  bound.prototype = new Fn();
  return bound;
};
