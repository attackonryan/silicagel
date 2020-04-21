let uid = 0

export default class Dep {
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