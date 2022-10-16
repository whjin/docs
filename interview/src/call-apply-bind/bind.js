Function.prototype.myBind = function (context = window) {
  if (typeof this !== "function") {
    throw new TypeError("type error");
  }

  let args = [...arguments].slice(1),
    self = this;

  return function Fn() {
    return self.apply(
      this instanceof Fn ? this : context,
      args.concat([...arguments])
    );
  };
};
