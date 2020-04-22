let uid = 0

class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  depend() {
    Dep.target.addDep(this)
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

export {
  Dep
}