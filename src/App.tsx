import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { createDB } from './database/database';
import { register } from './serviceWorkerRegistration';
import { EventOverView } from './views/EventOverView';
import { EventView } from './views/EventView';
import { StartView } from './views/StartView';
import { GameCreationView } from './views/gameCreationView/GameCreationView';


register();


function App() {
  useEffect(() => {
    (async () => await createDB())();
  });

  return (
    <div className="App bg-secondary min-h-screen flex justify-center p-4">
      <div className="inner w-full md:w-1/2">
        <BrowserRouter>
          <Switch>
          <Route path="/create">
              <GameCreationView />
            </Route>
            <Route path="/games">
              <EventOverView />
            </Route>
            <Route path="/game/:id">
              <EventView />
            </Route>
            <Route path="/">
              <StartView />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
