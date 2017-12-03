import { h, app } from 'hyperapp'
import { request } from 'graphql-request'
import {Config, CognitoIdentityCredentials} from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import appConfig from "./config";
import { login, handleAuthentication } from "./Auth/auth"

/** @jsx h */

// graphql init query
const query = `{
  allProducts {
    name
    community {
      name
    }
  }
}`

// hyperapp init
app({
  state: {
    count: 0,
    products: []
  },
  view: (state, actions) =>
    <main>
      <h1>{state.count}</h1>    
      <button 
        onclick={actions.down} 
        disabled={state.count <= 0}>ー</button>
      <button onclick={actions.up}>＋</button>
    <button onclick={actions.reset}>Reset</button>
    <button onclick={actions.addProduct}>Add DJI Spark</button>
    </main>,
  actions: {
    down: state => {
      console.log('down clicked')
      
      request('https://api.graph.cool/simple/v1/MobcutAlpha', query).then(data => console.log(data))
      return { count: state.count - 1 }
    },
    up: state => { 
      console.log('up clicked', login)
      login()
      return { count: state.count + 1 }
    },
    addProduct: state => {
        console.log('products', state.products)
    
        return { products: state.products.concat({ name: "DJI Spark", price: 200000})}
    },
    reset: state => ({ count: 0})
    
  }
})
