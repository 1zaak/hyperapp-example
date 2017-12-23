import { h } from "hyperapp"
import { Link } from "@hyperapp/router"
import DiscussionView from "./discussion/view"
import Loader from "../_assets/loader"
import distanceInWordsToNow from "date-fns/distance_in_words_to_now"
import { dangerouslySetInnerHTML } from "../_utils"

// @TODO: Stuff to put in discussion
// - actual user details @TODO: Add auth0 user details in our DB
// - # of messages
// - main image? @TODO: input for user
// - DOMPurify the dangerouslySetInnerHTML function

/** @jsx h */
export default ({fetchDiscussions, discussions, isFetching}) => 
  {
    return <div key="discussions" oncreate={fetchDiscussions}>
        {
            !isFetching ? discussions.map(discussion=>{
              return <Link to={"/discussion/" + discussion.id} class="box">
                <div class="level">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{discussion.discussion_title}</strong> <small>@johnsmith</small> <small>{distanceInWordsToNow(discussion.updated_at, {addSuffix: true})}</small>
                          <br/>
                         
                        </p>
                        <div oncreate={dangerouslySetInnerHTML(discussion.discussion_post)}></div>                        
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
            }) : <Loader colour={"black"}/>
        }
    </div>   
  }