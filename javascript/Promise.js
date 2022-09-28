// 定义 MyPromise 的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new Error("传入的参数不是一个有效函数");
    }
    this.state = PENDING;
    this.value = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    this._resolve = (val) => {
      if (this.state !== PENDING) {
        return;
      }
      this.state = FULFILLED;
      this.data = val;
      this.onFulfilledCallback.forEach((fn) => fn(this.data));
    };
    this._reject = (val) => {
      if (this.state !== PENDING) {
        return;
      }
      this.state = REJECTED;
      this.data = val;
      this.onRejectedCallback.forEach((fn) => fn(this.data));
    };
    try {
      executor(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilled = (value) => {
        try {
          if (this.isFunction(onFulfilled)) {
            resolve(onFulfilled(value));
          } else {
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      };
      const rejected = (value) => {
        try {
          if (this.isFunction(onRejected)) {
            reject(onRejected(value));
          } else {
            reject(value);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === PENDING) {
        this.onFulfilledCallback.push(fulfilled);
        this.onRejectedCallback.push(rejected);
      }
      if (this.state === FULFILLED) {
        return fulfilled(this.data);
      }
      if (this.state === REJECTED) {
        return rejected(this.data);
      }
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve) => resolve(value));
    }
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value));
  }
  static all(list) {
    return new MyPromise((resolve, reject) => {
      let values = [];
      let count = 0;
      list.forEach((e, i) => {
        this.resolve(e).then(
          (res) => {
            values[i] = res;
            count++;
            if (count === list.length) {
              resolve(values);
            }
          },
          (err) => reject(err)
        );
      });
    });
  }

  isFunction(fn) {
    return fn instanceof Function;
  }
}