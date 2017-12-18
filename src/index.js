import { h, app } from "hyperapp"
import { location } from "@hyperapp/router"
// import pell from 'pell' // TODO: WYSWIG in Discussion
import "./_styles/main.scss"
import actions from "./_main/actions"
import state from "./_main/state"
import view from "./_main/view"

/** @jsx h */
const main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
