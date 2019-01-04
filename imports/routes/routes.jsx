import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Link from '../ui/Link.jsx';
import Login from '../ui/Login.jsx';
import NotFound from '../ui/NotFound.jsx';
import Signup from '../ui/Signup.jsx';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = (Component) => {
    if (Meteor.userId()) {
        return <Redirect to="/links" />
    } else {
        return <Component/>
    }
}

const onEnterPrivatePage = (Component) => {
    if (!Meteor.userId()) {
        return <Redirect to="/" />
    } else {
        return <Component/>
    }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if ( isUnauthenticatedPage && isAuthenticated ) {
    browserHistory.replace('/links');
    window.location.reload();
  }

  if ( isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
    window.location.reload();
  }
};

export const routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route exact path='/links'  render={ () => onEnterPrivatePage(Link)}/>
      <Route exact path='/signup' render={ () => onEnterPublicPage(Signup)}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </Router>
);
