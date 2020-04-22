import {
  Dep
} from "./dep"

class Watcher {
  constructor(proxy, expOrFn, cb) {
    this.depIds = {}
    this.proxy = proxy
    this.cb = cb
    this.expOrFn = expOrFn
    const isLegal = this.checkParam(proxy, expOrFn, cb)
    this.val = this.get(isLegal)
  }
  checkParam(proxy, expOrFn, cb) {
    if (!(proxy._isObserved)) {
      console.warn("Watcher need an observed object for arguments[0] but got other object,try to use observe method to get an observed object.")
      return false
    }
    if (!(typeof expOrFn === "string" || typeof expOrFn === "function")) {
      console.warn(`Watcher need a expression or a function for arguments[1] but got a ${typeof expOrFn}.`)
      return false
    }
    if (!(typeof cb === "function")) {
      console.warn(`Watcher need a function for arguments[2] but got a ${typeof cb}.`)
      return false
    }
    return true
  }
  update() {
    this.run()
  }
  addDep(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }
  run() {
    const val = this.get(true)
    if (val !== this.val) {
      this.cb.call(this.proxy, val, this.val)
      this.val = val
    }
  }
  get(isLegal) {
    if (!isLegal) return
    Dep.target = this
    let val
    if (typeof this.expOrFn === "function") {
      val = this.expOrFn()
    } else if (this.expOrFn.includes('.')) {
      const expArr = this.expOrFn.split('.')
      val = expArr.reduce((proxy, exp) => {
        return proxy[exp]
      }, this.proxy)
    } else {
      val = this.proxy[this.expOrFn]
    }
    Dep.target = null
    return val
  }
}

export {
  Watcher
}