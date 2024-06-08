function Animal(name) {
    // 属性
    this.name = name;
    // 实例方法
    this.sleep = function () {
      console.log(this.name + "sleep");
    };
  }
  // 原型方法
  Animal.prototype.eat = function (food) {
    console.log(this.name + "eat" + food);
  };
  
  // 原型链继承
  function Cat() {}
  Cat.prototype = new Animal();
  Cat.prototype.name = "cat";
  
  // 构造函数继承
  function Cat(name) {
    Animal.call(this);
    this.name = name;
  }
  
  // 组合继承
  function Cat(name) {
    Animal.call(this);
    this.name = name;
  }
  Cat.prototype = new Animal();
  Cat.prototype.constructor = Cat;
  
  // 寄生组合继承
  function Cat(name) {
    Animal.call(this);
    this.name = name;
  }
  (function () {
    // 创建一个没有实例方法的类
    const Super = function () {};
    Super.prototype = Animal.prototype;
    // 将实例作为子类的原型
    Cat.prototype = new Super();
  })();
  