import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import NoFoundPage from '~/pages/404';
import Layout from '~/pages/Popup/Layout';

function RouteMapper(routes,history) {
  return routes.map((route, i) => (
    <Route exact={route.exact} path={route.path}  key={i} render={props =>(
      <route.component {...props} routes={route?.routes} history={history} />
    )}></Route>
  ));
}

function RouterConfig({ history, routes, location }) {
  return (
    <Router history={history} routes={routes}>
      <Route path="/" render={props => <Layout {...props} routes={routes} history={history} location={location}/>}/>
      <div hidden={true}>
      <Switch>
        {RouteMapper(routes,history)}
        <Route>
          <NoFoundPage history={history}/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting 
        <route.component {...props} routes={route.routes} history={history} />
      )}
    />
  );
}


export default RouterConfig;
