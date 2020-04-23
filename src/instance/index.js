import * as proxy from "../proxy/index"
import {
  compile 
}from "../compiler/index"
import {
  isPlainObject
}from "../utils/util"

function Silicagel(){
  //feature in future
}
Silicagel.render = function(el, proxy){
  if (!el || el.nodeType !== 1) {
    console.warn("You should provide an element node for argument[0]. (Silicagel.render)")
    return
  }
  if(!isPlainObject(proxy)){
    console.warn("You should provide an plain object for argument[1]. (Silicagel.render)")
    return
  }
  return compile(el, proxy)
}
Silicagel.observe = proxy.observe
Silicagel.Watcher = proxy.Watcher

export default Silicagel