import { 
  Pubsub 
} from "../../lib/Pubsub/Pubsub"
import {
  optionsType,
  proxyconfigType,
  Function,
  looseobject,
} from "../type/type"
export {
  Ryan
}
class Ryan{
  "options":optionsType
  "_data":looseobject
  "pubsub":Pubsub
  "el":Element
  "cache":string = ""
  "usecache":boolean = false
  constructor(options:optionsType){
    this.options = options
    this._data = options.data
    this.pubsub = new Pubsub();
    this.options.data = this._data = this.observe(this._data)
    this.compile(options.el,this._data)
    this.usecache = true
  }
  observe(data:looseobject){
    let _this = this
    let proxyconfig:proxyconfigType = {
      get(target:looseobject,key:string|number){
        if(_this.usecache)_this.cache += key 
        return Reflect.get(target,key)
      },
      set(target:looseobject,key:string|number,value:any){
        if(_this.usecache)_this.cache += key 
        _this.pubsub.publish(_this.cache,value)
        _this.cache = ""
        return Reflect.set(target,key,value)
      }
    }
    for(let [key,value] of Object.entries(data)){
      if(typeof value === "object"){
        data[key] = this.observe(value) 
      }
    }
    return new Proxy(data,proxyconfig)
  }
  compile(el:string,data:looseobject){
    let fragment:DocumentFragment
    fragment = document.createDocumentFragment()
    if(!(this.el = document.querySelector(el) as Element)){
      console.warn("do you sure you provide a correct el option?")
      return
    }
    this.fillFragment(fragment)
    this.replace(fragment)
    this.el.appendChild(fragment)
  }
  fillFragment(fragment:DocumentFragment){
    let child:ChildNode|null
    child = this.el.firstChild
    while(child){
      fragment.appendChild(child)
      child = this.el.firstChild
    }
  }
  replace(fragment:DocumentFragment|ChildNode){
    let text:string,
        reg:RegExp = /\{\{(.*?)\}\}/g
    Array.from(fragment.childNodes).forEach((node:any) =>{
      text = node.textContent as string
      if(node.nodeType === 3 && reg.test(text)){
        let arr:string[] = RegExp.$1.split(".")
        let val:any = this._data;
        arr.forEach(key => {
          val = val[key]
        })
        node.textContent = text.replace(reg,val).trim()
        this.pubsub.subscribe(arr.join(""),function(newval:any){
          node.textContent = text.replace(reg,newval).trim()
        })
      }
      if(node.nodeType === 1){
        let nodeAttr:NamedNodeMap = node.attributes
        Array.from(nodeAttr).forEach(attr => {
          if(!attr.name.includes("r-"))return
          let name:string = attr.name
          let exp:string = attr.value
          let value:string|number
          value = exp.split(".").reduce((pre:any,cur)=>{
            return pre[cur]
          },this._data)
          if(name === "r-model"){
            node.value = value
          }
          this.pubsub.subscribe(exp.split(".").join(""),function(newval:any){
            node.value = newval
          })
          node.addEventListener("input",(e:any)=>{
            exp.split(".").reduce((pre:any,cur,index,arr)=>{
              if(cur === arr[arr.length - 1]){
                return pre[cur] = e.target.value
              }
              return pre[cur]
            },this._data)
          })
        })
      }
      if(node.childNodes && node.childNodes.length){
        this.replace(node)
      }
    })
  }
}
