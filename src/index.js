import { h, app } from "hyperapp"
import { location, Switch, Route, Link } from "@hyperapp/router"
import { request } from "graphql-request"
import { login, handleAuthentication, setSession, logout, getUserProfile, isAuthenticated } from "./auth/auth"
import chunk from "lodash/chunk"
import NavView from "./navigation/view"
import MainTile from "./main-tile/view"
import Product from "./product/view"
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

// Products UI 
const Products = ({products}) => {
  let rows = chunk(products, 4)
  return rows.map(row=>{
    return <ProductRow row={row}/>
  })
     
}

const ProductRow = ({row}) =>
  <div class="columns">
    {row.map(({id, name, price})=>{      
      return <div class="column is-one-quarter-desktop"><Product id={id} name={name} price={price}/></div>
    })}
  </div>

// hyperapp init
const actions = app({
  state: {
    count: 0,
    products: [],
    location: location.state,
    mobileNavbarMenu: { toggled: false, className: "navbar-menu" }
  },
  actions: {    
    addProduct: () => state => {
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
        return { mobileNavbarMenu: { toggled: toggled, className: "navbar-menu is-active" }} 
      } else {
        return { mobileNavbarMenu: { toggled: toggled, className: "navbar-menu" }}
      }
      
    },
    location: location.actions
  },
  view: state => actions =>
  <div oncreate={ actions.init }>
  <NavView 
    login={actions.login} 
    logout={actions.logout} 
    addProduct={actions.addProduct} 
    togglemobileNavbarMenu={actions.togglemobileNavbarMenu}
    mobileNavbarMenu={state.mobileNavbarMenu}
  />
  <section class="section">
    {
      !isAuthenticated() && <MainTile/>
    }
    {     
      isAuthenticated() && <Products products={state.products}/>
    }
  </section>
  </div>
})

const unsubscribe = location.subscribe(actions.location)
// request("https://api.graph.cool/simple/v1/MobcutAlpha", query).then(data => console.log(data))