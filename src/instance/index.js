import * as proxy from "../proxy/index"
import {
  compile 
}from "../compiler/index"

function Padding(){

}
Padding.render = compile
Padding.observe = proxy.observe
Padding.Watcher = proxy.Watcher

export default Padding