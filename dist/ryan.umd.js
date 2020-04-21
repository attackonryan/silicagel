(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  let uid = 0;

  class Dep {
    constructor() {
      this.id = uid++;
      this.subs = [];
    }
    depend() {
      Dep.target.addDep(this);
    }
    addSub(sub) {
      this.subs.push(sub);
    }
    notify() {
      this.subs.forEach(sub => sub.update());
    }
  }

  class Watcher {
    constructor(vm, expOrFn, cb) {
      this.depIds = {};
      this.vm = vm; 
      this.cb = cb; 
      this.expOrFn = expOrFn; 
      this.val = this.get(); 
    }
    update() {
      this.run();
    }
    addDep(dep) {
      if (!this.depIds.hasOwnProperty(dep.id)) {
        dep.addSub(this);
        this.depIds[dep.id] = dep;
      }
    }
    run() {
      const val = this.get();
      if (val !== this.val) {
        this.val = val;
        this.cb.call(this.vm, val);
      }
    }
    get() {
      Dep.target = this;
      const val = this.vm[this.expOrFn];
      Dep.target = null;
      return val
    }
  }

  function isObject(val) {
    return typeof val === 'object'
  }

  function hasOwn(val, key) {
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    return hasOwnProperty.call(val, key)
  }

  //缓存原始数据与代理数据的映射
  let raw2Proxy = new WeakMap();
  let proxy2Raw = new WeakMap();

  class Observer {
    constructor(value) {
      this.value = value;
      this.dep = new Dep();
      this._proxy = this.proxy(value);
    }
    proxy(value) {
      const self = this;
      let observed = raw2Proxy.get(value);
      if (observed) {
        return observed
      }
      if (proxy2Raw.has(value)) {
        //check
        console.warn("proxy2Raw");
        return value
      }
      observed = new Proxy(value, {
        get(target, key, receiver)  {
          if(Dep.target){
            self.dep.depend();
          }
          const result = Reflect.get(target, key, receiver);
          return isObject(result) ? observe(result) : result
        },
        set(target, key, val, receiver) {
          const hadKey = hasOwn(target, key);
          const oldValue = target[key];

          val = proxy2Raw.get(val) || val;

          if(oldValue === val){
            return true
          
          }
          const result = Reflect.set(target, key, val, receiver);
          self.dep.notify();
          return result
        }
      });
      raw2Proxy.set(value, observed);
      proxy2Raw.set(observed, value);
      return observed
    }
  }

  function observe(value) {
    if (!value || typeof value !== 'object') {
      return
    }
    return new Observer(value)._proxy
  }

  let obj = {
    a: 2
  };
  obj = observe(obj);
  new Watcher(obj, "a", (newVal)=>{
    console.log(newVal);
  });

  obj.a = 10;

  obj.a = {b:1};
  obj.a.b = 3;
  console.log(obj.a);
  new Watcher(obj.a, "b", (newVal)=>{
    console.log(newVal);
  });
  obj.a.b = 4;
  obj.a.b = 4;

})));
