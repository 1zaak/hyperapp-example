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
        } else if (err) {
          history.replace('/');
          console.log('err', err);
        }
    });
}

export function setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('mobcut_access_token', authResult.accessToken);
    localStorage.setItem('mobcut_id_token', authResult.idToken);
    localStorage.setItem('mobcut_expires_at', expiresAt);

    auth.client.userInfo(authResult.accessToken, function(err, user) {
      localStorage.setItem('mobcut_user', JSON.stringify(user));
      // navigate to the home route
      history.replace('/all-products');
    });
  }

  export function logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('mobcut_access_token');
    localStorage.removeItem('mobcut_id_token');
    localStorage.removeItem('mobcut_expires_at');
    localStorage.removeItem('mobcut_user');
    // navigate to the home route
    history.replace('/');
  }

  export function isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('mobcut_expires_at'));
    
    return new Date().getTime() < expiresAt;
  }

  export function getUserProfile() {
    return JSON.parse(localStorage.getItem('mobcut_user'));
  }
