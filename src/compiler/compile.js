import {
  Watcher,
  observe,
} from "../proxy/index"

function compile(el, proxy) {
  if (!proxy._isObserved) {
    proxy = observe(proxy)
  }
  let fragment = document.createDocumentFragment()
  let child
  while (child = el.firstChild) {
    fragment.appendChild(child)
  }

  function replace(frag) {
    Array.from(frag.childNodes).forEach(node => {
      const text = node.textContent
      const reg = /\{\{(.*?)\}\}/g
      if (node.nodeType === 3 && reg.test(text)) {
        const initSymbol = Symbol.for("replaceText")

        function replaceText(initSymbol) {
          node.textContent = text.replace(reg, (matched, placeholder) => {
            if (initSymbol === Symbol.for("replaceText")) {
              new Watcher(proxy, placeholder, replaceText)
            }
            const res = placeholder.split(".").reduce((val, key) => {
              return val[key]
            }, proxy)
            return res && res.toString && res.toString()
          })
        }
        replaceText(initSymbol)
      }
      if (node.nodeType === 1) {
        const nodeAttr = node.attributes
        Array.from(nodeAttr).forEach(attr => {
          let name = attr.name
          let exp = attr.value
          if (name === "bind") {
            if (exp.includes(".")) {
              node.value = exp.split(".").reduce((val, key) => {
                return val[key]
              }, proxy)
            }else{
              node.value = proxy[exp]
            }
            new Watcher(proxy, exp, newVal => {
              node.value = newVal
            })
            node.addEventListener("input", e => {
              exp.split(".").reduce((val, key, i, arr) => {
                if (i === arr.length - 1) {
                  val[key] = e.target.value
                }
                return val[key]
              }, proxy)
            })
          }
        })
      }
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }
  replace(fragment)
  el.appendChild(fragment)
  return proxy
}

export {
  compile
}