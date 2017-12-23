import { location } from "@hyperapp/router"

export default {
    products: [],
    product: {},
    location: location.state,
    mobileNavbarMenu: { toggled: false, className: "navbar-menu" },
    isFetching: false,
}