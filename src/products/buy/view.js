import { h } from "hyperapp"

/** @jsx h */
export default ({match}) => 
    <div>
        <section class="hero is-medium is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    {match.params.productName}
                </h1>
                <h2 class="subtitle">
                    {match.params.id}
                </h2>
                </div>
            </div>
        </section>
    </div>