import { h } from "hyperapp"
import { chunk } from "../_utils/index"

/** @jsx h */
export const ProductCard = ({ id, product_name, community }) =>
    <div class="card" id={id}>
        <div class="card-image">
            <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
            </figure>
        </div>
        <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                </figure>
                </div>
                <div class="media-content">
                <p class="title is-4">{ product_name }</p>
            <p class="subtitle is-6">{ community }</p>
            </div>
        </div>
        <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris. <a>@mobcut</a>.
            <a href="#">#productcommunity</a> <a href="#">#{community}}</a>
            <br/>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
        
        </div>
    </div>   
  
export const ProductsRow = ({row}) => {
    return <div class="columns">
        {row.map(({id, product_name, community})=>{
        return (<div class="column is-one-quarter-desktop">
            <ProductCard id={id} product_name={product_name} community={community.data.community_name}/>
            </div>)
        })}
    </div>
}
    
export const Communities = ({products, fetchAllProducts}) => {
    let rows = chunk(products, 4)
    return rows.map(row=>(<ProductsRow row={row}/>))
}