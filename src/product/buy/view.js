import { h } from "hyperapp"

/** @jsx h */
export default ({match}) => <div>Product {match.params.productName} View</div>