import { h } from "hyperapp"
import chunk from "lodash/chunk"

/** @jsx h */
export const ProductCard = ({ id, name, price }) =>
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
                <p class="title is-4">{ name }</p>
            <p class="subtitle is-6">{ price }</p>
            </div>
        </div>
        <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br/>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
        
        </div>
    </div>   
  
export const ProductsRow = ({row}) => {
    return <div class="columns">
        {row.map(({id, name, price})=>{
        return (<div class="column is-one-quarter-desktop">
            <ProductCard id={id} name={name} price={price}/>
            </div>)
        })}
    </div>
}
    
export const Communities = ({products}) => {    
    let rows = chunk(products, 4)
    return rows.map(row=>{
        return <ProductsRow row={row}/>
    })
}