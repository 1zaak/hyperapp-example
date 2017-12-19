import { app } from "hyperapp"
import { location } from "@hyperapp/router"
import actions from "./_main/actions"
import state from "./_main/state"
import view from "./_main/view"
// import pell from 'pell' // TODO: WYSWIG in Discussion

const main = app(state, actions, view, document.body)
location.subscribe(main.location)
