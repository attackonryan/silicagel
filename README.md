# Silicagel
### Introduction:  
&nbsp;&nbsp;&nbsp;&nbsp;轻便，高性能的响应式库(压缩版仅3kb)，可进行双向绑定，数据侦听和插值模板解析   
&nbsp;&nbsp;&nbsp;&nbsp;Lightweight, high-performance responsive Library (compressed version only 3KB),  
&nbsp;&nbsp;&nbsp;&nbsp;which provide two-way data binding, data monitoring and can parse interpolation template syntax.
### Version: 1.1.1 
### Compatibility
&nbsp;&nbsp;&nbsp;&nbsp;不支持IE11，浏览器需要原生支持Proxy  
&nbsp;&nbsp;&nbsp;&nbsp;IE11 not supported,browser needs native Proxy support.
# Installation
## npm
```
npm install silicagel
```
## \<script\>
```
<!--直接引入dist文件下的silicagel.js，生产环境可以引入体积更小的silicagel.min.js-->
<script src="./dist/silicagel.js"></script>
<!--生产环境-->
<script src="./dist/silicagel.min.js"></script>
```
# Usage
### 插值模板解析
```html
<!--HTML example-->
<body>
  <h1>{{title}}</h1>
  <p>description: {{content.description}}</p>
  <p>wordNumber: {{content.wordNumber}}</p>
  <p>your comment: {{comment}}</p>
  <!--the 'bind' attribute will enable two-way data binding-->
  <!--
    If the input box changes, the data will be changed automatically. 
    The data changes will also be displayed in the current view automatically
  -->
  <input type="text" bind="comment">
</body>
```
```js
import Silicagel from "silicagel"
// or 
// const Silicagel = require("silicagel")

const node = document.body

let data = {
  title: "🌸Silicagel",
  content: {
    description: "Lightweight and high performance responsive Library",
    wordNumber: 500,
  },
  comment: "nice"
}
//render函数会将传入的元素节点内所有插值模板(譬如{{content.wordNumber}})转换成data中的数据
//The render method converts all the interpolation templates (such as {{content. Wordnumber}})
//in the passed element node to corresponding content in the passed data
//render函数会返回通过Proxy代理后的对象
//The render method returns a Proxy instance(same as observe method)
//经过代理后的data对象内的变化会立即反应在DOM中
//Changes in the Proxy instance will immediately reflected in the DOM
data = Silicagel.render(node, data)
```
### 数据监听
```js
import Silicagel from "silicagel"

let data = {
  msg: {
    id: 1,
    date: "2020/04/23",
  }
}
//observe函数返回经过Proxy代理后的函数，且提供watch方法监听数据变化
//The observe method returns a Proxy instance, and provides the watch method to listen for data changes
data = Silicagel.observe(data)

data.watch("msg.id", (newVal, oldVal) => {
  //do something
})

//watch函数的第一个参数也可以是一个函数，它会监听函数内部所有依赖的变化。这在监听数组变化时很有用
//The first parameter for the watch method can also be a function, 
//which listens for changes in all dependencies within the function.
//This is useful when listening for array changes
function combine(){
  return `id:${data.msg.id},date:${data.msg.date}`
}

data.watch(combine, (newVal, oldVal) => {
  //do something
})

```


### History:  
_Date: 2020/04/24_
&nbsp;&nbsp;&nbsp;&nbsp;Silicagel v1.1.1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console print code removed
_Date: 2020/04/24_   
&nbsp;&nbsp;&nbsp;&nbsp;Silicagel v1.1.0  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new feature: two-way data binding  
_Date: 2020/04/23_  
&nbsp;&nbsp;&nbsp;&nbsp;Silicagel v1.0.2  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Improved API error handling  
_Date: 2020/04/22_  
&nbsp;&nbsp;&nbsp;&nbsp;Release Silicagel v1.0.0