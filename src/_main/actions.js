import { location } from "@hyperapp/router"
import client from "./api-client"
import { login, handleAuthentication, logout } from "../_auth/auth"

export default {    
    addProduct: () => state => {
    client.getItems('product', "filters[community]=1&filters[community]=2")
    .then(res => console.log('products success',res))
    .catch(err => console.log('products error',err));
    return { products: state.products.concat({ id: state.products.length + 1, name: "DJI Spark", price: 200000})}
    },
    getAllProducts: (from = 0, to = 10) => state => {      
    let products = client.getItems('product')
        .then(res => {
            console.log('data returned', res.data)
            return res.data
        })
        .catch(err => console.log('products error',err));
    console.log('state.products',{ products: [...state.products, ...products] })
    return { products: [...state.products, ...products] }
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