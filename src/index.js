import Watcher from "./proxy/watcher"
import observe from "./proxy/observe"

let obj = {
  a: 2
}
obj = observe(obj)
new Watcher(obj, "a", (newVal)=>{
  console.log(newVal)
})

obj.a = 10

obj.a = {b:1}
obj.a.b = 3
console.log(obj.a)
new Watcher(obj.a, "b", (newVal)=>{
  console.log(newVal)
})
obj.a.b = 4
obj.a.b = 4