import { h, app } from "hyperapp"
import { location, Switch, Route, Link } from "@hyperapp/router"
import { request } from "graphql-request"
import { login, handleAuthentication, setSession, logout, isAuthenticated } from "./Auth/auth"

/** @jsx h */

// graphql init query
const query = `{
  allProducts {
    name
    community {
      name
    }
  }
}`

// Routing init
const helloView = () =>
<div>
  <h2>Helllllloooooo</h2>
</div>

// hyperapp init
app({
  state: {
    count: 0,
    products: [],
    loggedIn: false,
  },
  actions: {
    down: state => {
      console.log("down clicked", isAuthenticated)
      
      request("https://api.graph.cool/simple/v1/MobcutAlpha", query).then(data => console.log(data))
      return { count: state.count - 1 }
    },
    up: state => { 
      console.log("up clicked")
      
      return { count: state.count + 1 }
    },
    addProduct: state => {
        console.log("products", state.products)
    
        return { products: state.products.concat({ name: "DJI Spark", price: 200000})}
    },
    reset: state => ({ count: 0}),
    login: state => {
      login()
    },
    logout: state => {
      logout()
    }
  },
  view: (state, actions) =>
  <main oncreate={ console.log('Oncreate!', history)}>  
    <h1>{state.count}</h1>    
    <button 
      onclick={actions.down} 
      disabled={state.count <= 0}>ー</button>
    <button onclick={actions.up}>＋</button>
    <button onclick={actions.reset}>Reset</button>
    <button onclick={actions.addProduct}>Add DJI Spark</button>
    
    <button onclick={actions.login}>Login</button>
    <button onclick={actions.logout}>Logout</button>
       
    <Link to="/hello">Hello Page</Link>

    <Route path="/hello" view={helloView} />
    
  </main>
})
