import { h } from "hyperapp"
import { isAuthenticated, getUserProfile } from "../auth/auth"
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
          <Link to="/cuts" class="navbar-item">Cuts</Link>
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              Communities
            </div>                        
            <div class="navbar-dropdown is-boxed">
              <Link to="/communiy/watches" class="navbar-item">Watches</Link>
              <Link to="/communiy/gadgets" class="navbar-item">Gadgets</Link>              
              <hr class="navbar-divider"/>
              <a class="navbar-item" href="#">
                DYI (Coming soon)
              </a>
              <a class="navbar-item" href="#">
                Cars Accessories (Coming soon)
              </a>
            </div>
          </div>
          <a class="navbar-item" href="#">
            Discussions
          </a>
          <a class="navbar-item" href="#">
            Surveys
          </a>
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
