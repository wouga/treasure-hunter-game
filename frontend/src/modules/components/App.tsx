import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import basename from '../basename';
import routes from './routes';
import { LoginPage } from './LoginPage/LoginPage';
import { Playground } from './Playground/Playground';

const App = () => {
  return (
    <Router basename={basename}>
      <Switch>
        <Route path={routes.loginPage} exact={true} component={LoginPage} />
        <Route path={routes.playground} component={Playground} />
        <Redirect to={routes.loginPage} />
      </Switch>
    </Router>
  );
}

export default App;
