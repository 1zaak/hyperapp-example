import { h } from "hyperapp"
import { isAuthenticated, handleAuthentication } from "../_auth/auth"
import {Communities} from "../communities/views"
import Unprotected from "../unprotected/view"
import { Route, Redirect } from "@hyperapp/router"
import CommunityView from "../communities/community/view"
import ProductView from "../product/buy/view"
import ProductDiscussionView from "../products/discuss/view"
import SurveysView from "../surveys/view"
import SurveysCommunityView from "../surveys/community/view"
import CreateSurveyView from "../surveys/create-survey/view"
import {DiscussionsView, DiscussionView} from "../discussions/views"
import CommunityDiscussionView from "../discussions/community/view"
import CreateDiscussionView from "../discussions/create-discussion/view"

/** @jsx h */
export default ({ state, actions }) => 
    <div class="container">
        <Route path="/all-communities" render={()=>{
            if (isAuthenticated())  {
                return <Communities 
                    fetchAllProducts={actions.fetchAllProducts} 
                    products={state.products}
                    isFetching={state.isFetching}
                />
            } else {
                return <Unprotected/>
            }
        }} />    
        <Route path="/buy/:productId" render={({match})=>{
            console.log('buy product')
            return isAuthenticated() ? <ProductView 
                match={match} 
                fetchProduct={actions.fetchProduct} 
                product={state.product}
                isFetching={state.isFetching}
            /> : <Unprotected/>
        }} />
        <Route path="/community/:communityName" render={({match})=>{
            return isAuthenticated() ? <CommunityView match={match}/> : <Unprotected/>
        }} />
        <Route path="/community/:communityName/discussion" render={({match})=>{
            return isAuthenticated() ? <CommunityDiscussionView match={match}/> : <Unprotected/>
        }} />
        <Route path="/buy/:productName/discuss" render={()=>{
            return isAuthenticated() ? <ProductDiscussionView/> : <Unprotected/>
        }} />
        <Route path="/surveys" render={()=>{
            return isAuthenticated() ? <SurveysView/> : <Unprotected/>
        }} />
        <Route path="/surveys/:communityName" render={()=>{
            return isAuthenticated() ? <SurveysCommunityView/> : <Unprotected/>
        }} />
        <Route path="/create-survey" render={()=>{
            return isAuthenticated() ? <CreateSurveyView/> : <Unprotected/>
        }} />
        <Route path="/discussion/:discussionId" render={({match})=>{
            return isAuthenticated() ? <DiscussionView match={match}/> : <Unprotected/>
        }} />
        <Route path="/discussions" render={()=>{
            return isAuthenticated() ? <DiscussionsView/> : <Unprotected/>
        }} />
        <Route path="/create-discussion" render={()=>{
            return isAuthenticated() ? <CreateDiscussionView/> : <Unprotected/>
        }} />
        <Route path="/" render={()=>{    
            return isAuthenticated() ? <Redirect to="/all-communities"/> : <Unprotected/>                
        }} />   
        <Route path="/callback" render={()=>{
            handleAuthentication()           
        }} />
    </div>