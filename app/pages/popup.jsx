import React from 'react';
import '~/styles/popup.css';
import { Inspector } from 'react-dev-inspector';
import dva from 'dva';
import { createBrowserHistory, createMemoryHistory, createHashHistory } from 'history';
import RouterConfig from '~/config/router';
import global from '~/models/global';
import login from '~/models/login';
import loginform from '~/models/loginform';
import routes from '~/config/routes';

const app = dva({});

app.model(global);
app.model(login);
app.model(loginform);

const InspectorWraper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

// Deprecated
/*
render(
  <InspectorWraper>
      <Layout 
      />
  </InspectorWraper>,
  window.document.querySelector('#app-container')
);
*/

// define App
const App = (props) => {
 return(
  <InspectorWraper>
    <RouterConfig
      {...props}
      routes={routes}
      location={{location: {pathname: "/"}}}
    />
  </InspectorWraper>
 )
}

// 4. Router
app.router((props) => <App {...props}/>);

// 5. Start
app.start('#app-container');

export const store = app._store;
