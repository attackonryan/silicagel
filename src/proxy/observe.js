import Dep from "./dep"
import {
  isObject,
  hasOwn,
} from "./../utils/util"

//缓存原始数据与代理数据的映射
let raw2Proxy = new WeakMap()
let proxy2Raw = new WeakMap()

class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    this._proxy = this.proxy(value)
  }
  proxy(value) {
    const self = this
    let observed = raw2Proxy.get(value)
    if (observed) {
      return observed
    }
    if (proxy2Raw.has(value)) {
      //check
      console.warn("proxy2Raw")
      return value
    }
    observed = new Proxy(value, {
      get(target, key, receiver)  {
        if(Dep.target){
          self.dep.depend()
        }
        const result = Reflect.get(target, key, receiver)
        return isObject(result) ? observe(result) : result
      },
      set(target, key, val, receiver) {
        const hadKey = hasOwn(target, key)
        const oldValue = target[key]

        val = proxy2Raw.get(val) || val

        if(oldValue === val){
          return true
        
        }
        const result = Reflect.set(target, key, val, receiver)
        self.dep.notify()
        return result
      }
    })
    raw2Proxy.set(value, observed)
    proxy2Raw.set(observed, value)
    return observed
  }
}

export default function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)._proxy
}