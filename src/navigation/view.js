import { h } from "hyperapp"
import { isAuthenticated, getUserProfile } from "../_auth/auth"
import { Link } from "@hyperapp/router"

/** @jsx h */
export default ({ login, logout, addProduct, togglemobileNavbarMenu, mobileNavbarMenu }) =>  
<nav class="navbar is-transparent is-fixed-top level">
    <div class="container">
      <div class="navbar-brand">
        <Link to="/" class="navbar-item">
          <h1><b class="title">Mobcut</b></h1>
        </Link>        
        <div class="navbar-burger burger" onclick={togglemobileNavbarMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <div id="navbarExampleTransparentExample" class={mobileNavbarMenu.className}>
        <div class="navbar-start">
          <Link to="/all-communities" class="navbar-item">Discover</Link>
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              Communities
            </div>                        
            <div class="navbar-dropdown is-boxed">
              <Link to="/community/watches" class="navbar-item">Watches</Link>
              <Link to="/community/gadgets" class="navbar-item">Gadgets</Link>              
              <hr class="navbar-divider"/>
              <Link to="/community/diy" class="navbar-item">DYI (Coming soon)</Link>
              <Link to="/community/cars-accessories" class="navbar-item">Cars Accessories (Coming soon)</Link>              
            </div>
          </div>
          <Link to="/discussions" class="navbar-item">Discussions</Link>
          <Link to="/surveys" class="navbar-item">Surveys</Link>                                  
          <p class="navbar-item">            
          <button class="button is-outlined is-primary" onclick={ addProduct }>Create Survey</button>
          </p>
        </div>
    
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
                <span class="icon">
                <i class="fa fa-home is-large"></i>
              </span>      
              <button class="button is-link" onclick={ !isAuthenticated() ? login : logout}>
                  { !isAuthenticated() ? "Login" : "Logout" }
              </button>            
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
