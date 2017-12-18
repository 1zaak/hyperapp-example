import { location } from "@hyperapp/router"
import client from "./api-client"
import { login, handleAuthentication, logout } from "../_auth/auth"

export default {
    fetchAllProducts: query => async (state, actions) => {   
        actions.setProducts(await client.getItems('product')
            .then(res => {
                return res.data
            })
            .catch(err => console.log('products error',err))
        )
    },
    setProducts: (products) => state => ({ products }),
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