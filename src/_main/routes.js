import { h } from "hyperapp"
import { isAuthenticated } from "../_auth/auth"
import {Communities} from "../communities/views"
import Unprotected from "../unprotected/view"
import { Route, Redirect } from "@hyperapp/router"
import CommunityView from "../communities/community/view"
import ProductView from "../product/buy/view"
import ProductDiscussionView from "../product/discuss/view"
import SurveysView from "../surveys/view"
import SurveysCommunityView from "../surveys/community/view"
import CreateSurveyView from "../create-survey/view"
import DiscussionsView from "../discussions/view"
import CommunityDiscussionView from "../discussions/community/view"
import CreateDiscussionView from "../create-discussion/view"

/** @jsx h */
export default ({ state, actions }) => 
    <div class="container">
        <Route path="/all-communities" render={()=>{
            if (isAuthenticated())  {
                return <div oncreate={actions.fetchAllProducts}> <Communities products={state.products}/></div>
            } else {
                return <Unprotected/>
            }
        }} />    
        <Route path="/community/:communityName" render={({match})=>{
            return isAuthenticated() ? <CommunityView match={match}/> : <Unprotected/>
        }} />
        <Route path="/community/:communityName/discussion" render={({match})=>{
            return isAuthenticated() ? <CommunityDiscussionView match={match}/> : <Unprotected/>
        }} />
        <Route path="/buy/:productName" render={({match})=>{
            return isAuthenticated() ? <ProductView match={match}/> : <Unprotected/>
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
        <Route path="/discussions" render={()=>{
            return isAuthenticated() ? <DiscussionsView/> : <Unprotected/>
        }} />
        <Route path="/create-discussion" render={()=>{
            return isAuthenticated() ? <CreateDiscussionView/> : <Unprotected/>
        }} />
        <Route path="/" render={()=>{    
            return isAuthenticated() ? <Redirect to="/all-communities"/> : <Unprotected/>                
        }} />        
    </div>