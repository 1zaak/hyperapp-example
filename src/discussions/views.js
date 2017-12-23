import { h } from "hyperapp"
import { Link } from "@hyperapp/router"
import DiscussionView from "./discussion/view"
import Loader from "../_assets/loader"

/** @jsx h */
export default ({fetchDiscussions, discussions, isFetching}) => 
  {
    return <div key="discussions" oncreate={fetchDiscussions}>
        {
            !isFetching ? discussions.map(discussion=>(
              <Link to="/discussion/1">
                <div class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                          <br/>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                        </p>
                      </div>
                      <nav class="level is-mobile">
                        <div class="level-left">
                          <a class="level-item">
                            <span class="icon is-small"><i class="fa fa-reply"></i></span>
                          </a>
                          <a class="level-item">
                            <span class="icon is-small"><i class="fa fa-retweet"></i></span>
                          </a>
                          <a class="level-item">
                            <span class="icon is-small"><i class="fa fa-heart"></i></span>
                          </a>
                        </div>
                      </nav>
                    </div>
                  </article>
                </div>
                </Link>
            )) : <Loader colour={"black"}/>
        }
    </div>   
  }