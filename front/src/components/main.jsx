import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './app/app';
import BookPanel from './bookpanel/bookpanel';
import Login from './login/login';
import Register from './register/register';
import Auth from './utils/auth';

function requireAuth(nextState, replace) {
  if (!Auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={BookPanel} onEnter={requireAuth}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Route>
    </Router>
  ), document.getElementsByClassName('container')[0]
);
