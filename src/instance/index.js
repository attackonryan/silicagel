import * as proxy from "../proxy/index"
import {
  compile 
}from "../compiler/index"

function Silicagel(){

}
Silicagel.render = compile
Silicagel.observe = proxy.observe
Silicagel.Watcher = proxy.Watcher

export default Silicagel