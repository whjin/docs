const myNew = (fn, ...args) => {
  // 1. 创建空对象，继承构造函数原型
  const obj = Object.create(fn.prototype);
  // 2. 执行构造函数，绑定this
  const result = fn.apply(obj, args);
  // 3. 返回对象（若构造函数返回对象则优先返回）
  return typeof result === 'object' && result !== null ? result : obj;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log(`你好，我是${this.name}，今年${this.age}岁`);
  };
}

const person = myNew(Person, '张三', 18);
// person.sayHello();

function deepClone(target) {
  if (typeof target !== 'object' || target === null) return target;
  const clone = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = deepClone(target[key]);
    }
  }
  return clone;
}

const a = {
  a: 1,
  b: 'v',
  c: {
    a: 1,
    b: 2,
  },
};

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    let now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  // const [pivot, ...rest] = arr;
  const pivot = arr.splice(Math.floor(arr.length / 2), 1)[0];
  // return [...quickSort(rest.filter((x) => x < pivot)), pivot, ...quickSort(rest.filter((x) => x >= pivot))];
  return [
    ...quickSort(arr.filter((x) => x < pivot)),
    pivot,
    ...quickSort(arr.filter((x) => x >= pivot)),
  ];
};
