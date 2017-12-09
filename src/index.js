import { h, app } from "hyperapp"
import { location, Switch, Route, Link } from "@hyperapp/router"
import { request } from "graphql-request"
import { login, handleAuthentication, setSession, logout, getUserProfile, isAuthenticated } from "./auth/auth"
import NavView from "./navigation/view"
import MainTile from "./main-tile/view"
import Products from "./products/view"
import "./styles/main.scss"

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
  <div oncreate={ actions.init }>
  <NavView login={actions.login} logout={actions.logout} addProduct={actions.addProduct}/>
  <section class="section">
    {
      !isAuthenticated() && <MainTile/>
    }
    {
      isAuthenticated() && <Products/>
    }
  </section>
  </div>
})

const unsubscribe = location.subscribe(actions.location)
