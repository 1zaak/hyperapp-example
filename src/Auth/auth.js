import auth0 from 'auth0-js'
import config from './config'
import history from "./history"

const auth = new auth0.WebAuth(config);

export function login() {
    auth.authorize();
}

export function handleAuthentication() {
    auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          history.replace('/home');
        } else if (err) {
          history.replace('/home');
          console.log('err', err);
        }
    });
}

export function setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  export function logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  export function isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
