import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';

import Home from './pages/home';
import Main from './pages/main';
import Artist from './pages/artist';

const App = (): any => {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/main'} component={Main} />
          <Route path={'/artist'} component={Artist} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export default App;
