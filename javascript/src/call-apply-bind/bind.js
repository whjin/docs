Function.prototype.myBind = function (context = window) {
  if (typeof this !== "function") {
    throw new TypeError("type error");
  }

  let args = [...arguments].slice(1),
    fn = this;

  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat([...arguments])
    );
  };
};
