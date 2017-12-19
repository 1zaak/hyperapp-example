import { h } from "hyperapp"
import Navigation from "../navigation/view"
import Routes from "./routes"

/** @jsx h */
export default (state, actions) =>
    <div>
    <Navigation 
        login={actions.login} 
        logout={actions.logout} 
        addProduct={actions.addProduct} 
        togglemobileNavbarMenu={actions.togglemobileNavbarMenu}
        mobileNavbarMenu={state.mobileNavbarMenu}
    />  
    <section class="section">
        <div class="container">
            <Routes state={state} actions={actions}/>       
        </div>
    </section>
    </div>