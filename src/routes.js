import { h } from "hyperapp"
import { isAuthenticated } from "./_auth/auth"
import {Communities} from "./communities/views"
import Unprotected from "./unprotected/view"
import { Route, Redirect } from "@hyperapp/router"

/** @jsx h */
const AllCommunittiesView = () => <div>All Communitties View</div>
// const MyCommunittiesView = () => <div>My Communitties View</div>
const CommunityView = ({match}) => <div>Community {match.params.communityName} View</div>
const ProductView = ({match}) => <div>Product {match.params.productName} View</div>
const ProductDiscussionView = ({match}) => <div>Discussion for {match.params.productName} View</div>
const SurveysView = () => <div>Surveys View</div>
const SurveysCommunityView = ({match}) => <div>Survey for {match.params.communityName} View</div>
const CreateSurveyView = () => <div>Create Survey View</div>
const DiscussionsView = () => <div>Show All Discussions View</div>
const CommunityDiscussionView = () => <div>Community Discussion View</div>
const DiscussView = () => <div>Create Discussion View</div>

export default ({state}) => 
    <div class="container">
        <Route path="/all-communities" render={()=>{
            return isAuthenticated() ? <Communities products={state.products}/> : <Unprotected/>
        }} />    
        <Route path="/community/:communityName" render={({match})=>{
            return isAuthenticated() ? <CommunityView match={match}/> : <Unprotected/>
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
            return isAuthenticated() ? <DiscussView/> : <Unprotected/>
        }} />
        <Route path="/" render={()=>{    
            return isAuthenticated() ? <Redirect to="/all-communities"/> : <Unprotected/>                
        }} />        
    </div>