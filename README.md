# Padding
### Introduction: 
&nbsp;&nbsp;&nbsp;&nbsp;轻便，高性能的响应式库(压缩版仅3kb)，可解析插值模板和数据侦听  
&nbsp;&nbsp;&nbsp;&nbsp;Lightweight, high-performance responsive Library (compressed version only 3KB), which can parse interpolation template syntax and provide data monitoring.
### Version: 1.0.0  
### Compatibility
&nbsp;&nbsp;&nbsp;&nbsp;不支持IE11，浏览器需要原生支持Proxy  
&nbsp;&nbsp;&nbsp;&nbsp;IE11 not supported,browser needs native Proxy support.
# Installation
```
npm install Padding 
```
# Usage
### 插值模板解析
```js
import Padding from "padding"
// or 
// const Padding = require("padding")

const node = document.body

let data = {
  title: "🌸Padding",
  content: {
    description: "Lightweight and high performance responsive Library",
    wordNumber: 51,
  }
}
//render函数会将传入的元素节点内所有插值模板(譬如{{content.wordNumber}})转换成data中的数据
//The render method converts all the interpolation templates (such as {{content. Wordnumber}}) in the passed element node to corresponding content in the passed data
//render函数会返回通过Proxy代理后的对象
//The render method returns a Proxy instance(same as observe method)
//经过代理后的data对象内的变化会立即反应在DOM中
//Changes in the Proxy instance will immediately reflected in the DOM
data = Padding.render(node, data)
```
### 数据监听
```js
import Padding from "padding"

let data = {
  msg: {
    id: 1,
    date: "2020/04/22",
  }
}
//observe函数返回经过Proxy代理后的函数，且提供watch方法监听数据变化
//The observe method returns a Proxy instance, and provides the watch method to listen for data changes
data = Padding.observe(data)

data.watch("msg.id", (newVal, oldVal) => {
  //do something
})
```


### History:  
_Date: 2020/04/22_  
&nbsp;&nbsp;&nbsp;&nbsp;release Padding v1.0.0