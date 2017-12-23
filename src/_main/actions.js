import { location } from "@hyperapp/router"
import client from "./api-client"
import { login, handleAuthentication, logout } from "../_auth/auth"
import CommunitiesActions from "../communities/actions"
import ProductActions from "../products/buy/actions"
import DiscussionsActions from "../discussions/actions"

export default {
    fetchProducts: CommunitiesActions.fetchProducts,
    setProducts: CommunitiesActions.setProducts,
    fetchProduct: ProductActions.fetchProduct,
    setProduct: ProductActions.setProduct,
    fetchDiscussions: DiscussionsActions.fetchDiscussions,
    setDiscussions: DiscussionsActions.setDiscussions,
    toggleFetching: isFetching => ({ isFetching }),
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
    togglemobileNavbarMenu: _ => state => {     
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
}