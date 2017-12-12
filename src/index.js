import { h, app } from "hyperapp"
import { location, Switch, Route, Link, Redirect } from "@hyperapp/router"
import pell from 'pell'
import { login, handleAuthentication, setSession, logout, getUserProfile, isAuthenticated } from "./_auth/auth"
import Navigation from "./navigation/view"
import Routes from "./routes"
import "./_styles/main.scss"

const RemoteInstance = require('directus-sdk-javascript/remote');

const client = new RemoteInstance({
  url: 'http://cms.mobcut.com/api/1.1/',
  accessToken: ["wS0Zb1CXaKHGFRPL25glQU41eNJ4vFJo"]
});

/** @jsx h */
const actions = app({
  state: {
    count: 0,
    products: [],
    location: location.state,
    mobileNavbarMenu: { toggled: false, className: "navbar-menu" }
  },
  actions: {    
    addProduct: () => state => {
      client.getItems('product', "filters[community]=1&filters[community]=2")
      .then(res => console.log('products success',res))
      .catch(err => console.log('products error',err));
      return { products: state.products.concat({ id: state.products.length + 1, name: "DJI Spark", price: 200000})}
    },
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
    togglemobileNavbarMenu: (e) => state => {     
      let toggled = !state.mobileNavbarMenu.toggled
      if (toggled) {
        return { mobileNavbarMenu: { 
          toggled: toggled, className: "navbar-menu is-active" 
        }} 
      } else {
        return { mobileNavbarMenu: { 
          toggled: toggled, 
          className: "navbar-menu" 
        }}
      }   
    },
    location: location.actions
  },
  view: state => actions =>
  <div oncreate={ actions.init }>
    <Navigation 
      login={actions.login} 
      logout={actions.logout} 
      addProduct={actions.addProduct} 
      togglemobileNavbarMenu={actions.togglemobileNavbarMenu}
      mobileNavbarMenu={state.mobileNavbarMenu}
    />  
    <section class="section">
      <div class="container">
        <Routes state={state}/>       
      </div>
    </section>
  </div>
})

const unsubscribe = location.subscribe(actions.location)

// Sample working GraphQL request
//
// graphql init query
// const query = `{
//   allProducts {
//     name
//     community {
//       name
//     }
//   }
// }`
// request("https://api.graph.cool/simple/v1/MobcutAlpha", query).then(data => console.log(data))
