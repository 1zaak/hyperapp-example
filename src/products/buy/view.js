import { h } from "hyperapp"

/** @jsx h */
export default ({match, fetchProduct, product}) => 
        <section class="hero is-medium is-primary is-bold">
            <div oncreate={()=>fetchProduct(match.params.productId)} class="hero-body">
                <div class="container">
                <h1 class="title">
                    {product.product_name}
                    
                </h1>
               
                <h2 class="subtitle">
                
                </h2>
                </div>
            </div>
            <Logo />
        </section>