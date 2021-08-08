import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { register } from './serviceWorkerRegistration';
import { EventView } from './views/EventView';
import { StartView } from './views/StartView';

register();

function App() {
  return (
    <div className="App bg-secondary min-h-screen flex justify-center">
      <BrowserRouter>
        <Switch>
          <Route path="/game">
            <EventView />
          </Route>
          <Route path="/">
            <StartView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
