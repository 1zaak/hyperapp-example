const { h, app } = require('hyperapp')
const { request } = require('graphql-request')

/** @jsx h */

app({
  state: {
    count: 0,
    products: []
  },
  view: (state, actions) =>
    <main>
      <h1>{state.count}</h1>    
      <button 
        onclick={actions.down} 
        disabled={state.count <= 0}>ー</button>
      <button onclick={actions.up}>＋</button>
    <button onclick={actions.reset}>Reset</button>
    <button onclick={actions.addProduct}>Add DJI Spark</button>
    </main>,
  actions: {
    down: state => {
      console.log('down clicked')
      console.log(request)
      return { count: state.count - 1 }
    },
    up: state => ({ count: state.count + 1 }),
    addProduct: state => {
        console.log('products', state.products)
    
        return { products: state.products.concat({ name: "DJI Spark", price: 200000})}
    },
    reset: state => ({ count: 0})
    
  }
})

// https://api.graph.cool/simple/v1/MobcutAlpha