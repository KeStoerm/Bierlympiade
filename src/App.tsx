import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { createDB } from './database/database';
import { register } from './serviceWorkerRegistration';
import { EventView } from './views/EventView';
import { StartView } from './views/StartView';


register();


function App() {
  useEffect(() => {
    (async () => await createDB())();
  });

  return (
    <div className="App bg-secondary min-h-screen flex justify-center">
      <BrowserRouter>
        <Switch>
          <Route path="/game/:id">
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
