import { h, app } from "hyperapp"
import { location, Switch, Route, Link, Redirect } from "@hyperapp/router"
import { request } from "graphql-request"
import { login, handleAuthentication, setSession, logout, getUserProfile, isAuthenticated } from "./auth/auth"
import NavView from "./navigation/view"
import Unprotected from "./main-tile/view"
import {Products} from "./products/views"
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
      console.log('addProduct', state.products)
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
    <NavView 
      login={actions.login} 
      logout={actions.logout} 
      addProduct={actions.addProduct} 
      togglemobileNavbarMenu={actions.togglemobileNavbarMenu}
      mobileNavbarMenu={state.mobileNavbarMenu}
    />  
    <section class="section">
      <div class="container">        
        {     
          isAuthenticated() && <Products products={state.products}/>          
        }
      </div>
    </section>
  </div>
})

const unsubscribe = location.subscribe(actions.location)

// Sample working GraphQL request
//
// request("https://api.graph.cool/simple/v1/MobcutAlpha", query).then(data => console.log(data))


// Initalize all views
// const AllCommunittiesView = () => <div>All Communitties View</div>
// const MyCommunittiesView = () => <div>My Communitties View</div>
// const CommunityView = ({match}) => <div>Community {match.params.communityName} View</div>
// const ProductView = ({match}) => <div>Product {match.params.productName} View</div>
// const ProductDiscussionView = ({match}) => <div>Discussion for {match.params.productName} View</div>
// const SurveysView = () => <div>Surveys View</div>
// const SurveysCommunityView = ({match}) => <div>Survey for {match.params.communityName} View</div>
// const CreateSurveyView = () => <div>Create Survey View</div>
// const DiscussionsView = () => <div>Show All Discussions View</div>
// const CommunityDiscussionView = () => <div>Community Discussion View</div>
// const DiscussView = () => <div>Create Discussion View</div>

// Initialize all routes. TODO: Solve issue with nested views not working in route
// {     
//   <Switch>
//     <Route path="/all-products" render={Products({products: state.products})} />  
//     <Route path="/all-communities" render={AllCommunittiesView} />  
//     <Route path="/my-communities" render={MyCommunittiesView} />  
//     <Route path="/community/:communityName" render={CommunityView} />  
//     <Route path="/buy/:productName" render={ProductView} />  
//     <Route path="/buy/:productName/discuss" render={ProductDiscussionView} />  
//     <Route path="/surveys" render={SurveysView} />  
//     <Route path="/surveys/:communityName" render={SurveysCommunityView} />  
//     <Route path="/create-survey" render={CreateSurveyView} />  
//     <Route path="/discussions" render={DiscussionsView} />  
//     <Route path="/discuss" render={DiscussView} />    
//     <Route path="/" render={()=>{              
//       if (isAuthenticated()) {
//         return <Redirect to="/all-products"/>
//       } else {                
//         return <Unprotected/>
//       }            
//     }} />
//   </Switch>
// }