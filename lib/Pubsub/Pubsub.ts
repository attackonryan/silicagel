export {Pubsub} 
class Pubsub{
  events:{
    [name:string]:Array<(...params:any)=>any>
  }
  constructor(){
    this.events = {}
  }
  subscribe( name : string, subfunc : (...params:any)=>any){
    if(!this.events[name]){
      this.events[name] = []
    }
    return this.events[name].push(subfunc)
  }
  publish( name : string, ...params : any){
    if(!this.events[name]){
      return
    }
    return this.events[name].map(event=>event(...params))
  }
}


