function basicPromise(constructor) {
  let self = this;
  self.status = "pending"; // 定义改变状态前的初始状态
  self.value = undefined; // 定义状态为 resolved 时的状态
  self.reason = undefined; // 定义状态位 rejected 时的状态

  function resolve(value) {
    if (self.status === "pending") {
      self.status = "resolved";
      self.value = value;
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.reason = reason;
    }
  }

  // 捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}
