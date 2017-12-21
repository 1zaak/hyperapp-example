import { h } from "hyperapp"
import { chunk } from "../_utils/index"
import { Link } from "@hyperapp/router"

// @TODO: Stuff to put in product card
// - Product Name
// - Original price
// - Discount price
// - # of comments
// - price per volume
// - # of orders

/** @jsx h */
export const ProductCard = ({ id, product_name, community, image }) =>
    <Link to={"/buy/" + id}>
        <div class="card" id={id}>
            <div class="card-image">
                <figure class="image is-4by3">
                <img src={image} alt={ product_name }/>
                </figure>
            </div>
            <div class="card-content">
            <div class="media"> 
                <div class="media-content">
                <p class="title is-4">{ product_name }</p>
                <p class="subtitle is-6">{ community }</p>
            </div>
            </div>
            <div class="content">
                <a href="#">#{community}</a>
                <br/>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
            </div>
        </div>   
    </Link>    
  
export const ProductsRow = ({row}) => {
    return <div class="columns">
        {row.map(({id, product_name, community, main_image_url})=>{
        return (<div class="column is-one-quarter-desktop">
            <ProductCard id={id} product_name={product_name} community={community.data.community_name} image={main_image_url}/>
            </div>)
        })}
    </div>
}
    
export const Communities = ({products, fetchAllProducts}) => {
    let rows = chunk(products, 4)
    return <div oncreate={fetchAllProducts}>
        {
            rows.map(row=>(<ProductsRow row={row}/>))
        }
    </div>     
}
