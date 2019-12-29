export {
  optionsType,
  proxyconfigType,
  Function,
  looseobject,
}
type Function = (...params:any)=>any

type optionsType = {
  el:string,
  data:object,
}
type proxyconfigType = {
  get:Function
  set:Function
} 
type looseobject = {
  [name:string]:any
}
