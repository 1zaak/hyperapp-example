import { h, app } from "hyperapp"
import { location, Switch, Route, Link } from "@hyperapp/router"
import { request } from "graphql-request"
import { login, handleAuthentication, setSession, logout, isAuthenticated, getUserProfile } from "./Auth/auth"

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
const actions = app({
  state: {
    count: 0,
    products: [],
    loggedIn: false,
    location: location.state
  },
  actions: {
    down: () => state => {
      console.log("down clicked", isAuthenticated)
      
      request("https://api.graph.cool/simple/v1/MobcutAlpha", query).then(data => console.log(data))
      return { count: state.count - 1 }
    },
    up: () => state => { 
      console.log("up clicked", state.profile)
      
      return { count: state.count + 1 }
    },
    addProduct: () => state => {
        console.log("products", state.products)
    
        return { products: state.products.concat({ name: "DJI Spark", price: 200000})}
    },
    reset: () => state => ({ count: 0 }),
    login: () => state => {
      login()
    },
    logout: () => state => {
      logout()
      return { profile: {} }
    },
    init: () => state => {
      handleAuthentication();
    },
    location: location.actions
  },
  view: state => actions =>
  <main class="container" oncreate={ actions.init }>  
    <h1 class="title">
      Hello World
    </h1>
    <p class="subtitle">
      My first website with <strong>Bulma</strong>!
    </p>
    <h1>{state.count}</h1>    
    <button 
      onclick={actions.down} 
      disabled={state.count <= 0}>ー</button>
    <button onclick={actions.up}>＋</button>
    <button onclick={actions.reset}>Reset</button>
    <button onclick={actions.addProduct}>Add DJI Spark</button>
   
    <button onclick={ !isAuthenticated() ? actions.login : actions.logout}>
      { !isAuthenticated() ? "Login" : "Logout" }
    </button>
    
       Name: { getUserProfile() && getUserProfile().name }
    <Link to="/hello">Hello Page</Link>

    <Route path="/hello" view={helloView} />
    
  </main>
})

const unsubscribe = location.subscribe(actions.location)
