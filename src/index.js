import { h, app } from "hyperapp"
import { location } from "@hyperapp/router"
import pell from 'pell'
import { login, handleAuthentication, logout } from "./_auth/auth"
import Navigation from "./navigation/view"
import Routes from "./routes"
import "./_styles/main.scss"
import RemoteInstance from "directus-sdk-javascript/remote"

const client = new RemoteInstance({
  url: 'http://cms.mobcut.com/api/1.1/',
  accessToken: ["wS0Zb1CXaKHGFRPL25glQU41eNJ4vFJo"]
});

/** @jsx h */
const actions = app(
  {
    count: 0,
    products: [],
    location: location.state,
    mobileNavbarMenu: { toggled: false, className: "navbar-menu" }
  },
  {    
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
  (state, actions) =>
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
  </div>,
  document.body
)

const unsubscribe = location.subscribe(actions.location)
