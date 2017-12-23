import { h } from "hyperapp"
import Loader from "../../_assets/loader"

/** @jsx h */
export default ({match, fetchProduct, product, isFetching}) => 
        <section class="hero is-medium is-primary is-bold">
            <div oncreate={()=>fetchProduct(match.params.productId)} class="hero-body">
                <div class="container">
                <h1 class="title">
                    {!isFetching ? product.product_name : <Loader colour={"#fff"} />}                    
                </h1>               
                <h2 class="subtitle">
                
                </h2>
                </div>
            </div>
        </section>