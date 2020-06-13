import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import basename from '../basename';
import routes from './routes';
import { LoginPage } from './LoginPage/LoginPage';
import { GameBoard } from './GameBoard/GameBoard';

const App = () => {
  return (
    <Router basename={basename}>
      <Switch>
        <Route path={routes.loginPage} exact={true} component={LoginPage} />
        <Route path={routes.gameBoard} component={GameBoard} />
        <Redirect to={routes.loginPage} />
      </Switch>
    </Router>
  );
}

export default App;
