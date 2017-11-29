const { h, app } = hyperapp
/** @jsx h */

app({
  state: {
    count: 0
  },
  view: (state, actions) =>
    <main>
      <h1>{state.count}</h1>
      <button 
        onclick={actions.down} 
        disabled={state.count <= 0}>ー</button>
      <button onclick={actions.up}>＋</button>
    <button onclick={actions.reset}>Reset</button>
    </main>,
  actions: {
    down: state => {
      console.log('down clicked')
      return { count: state.count - 1 }
    },
    up: state => ({ count: state.count + 1 }),
    reset: state => ({ count: 0})
    
  }
})