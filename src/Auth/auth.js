import auth0 from 'auth0-js';
import config from './config';

const auth = new auth0.WebAuth(config);

export function login() {
    auth.authorize();
}

export function handleAuthentication() {
    auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          history.replace('/home');
        } else if (err) {
          history.replace('/home');
          console.log(err);
        }
    });
}