import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';

import Home from './pages/home';

const App = (): any => {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={'/'} component={Home} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export default App;
