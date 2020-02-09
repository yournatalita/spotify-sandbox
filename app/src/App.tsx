import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

const App = (): any => {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={'/'} component={PasswordRecover} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export default App;
