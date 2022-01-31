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
import { annealGamePlan } from './utils/gamePlanAnnealingUtils';
import { gameDays, games, pointBuckets } from './data/gameData';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config/firebaseConfig';
import { Headbar } from './components/headbar/Headbar';

const app = initializeApp(firebaseConfig);

register();

function App() {

  useEffect(() => {
    annealGamePlan(games, pointBuckets, gameDays);
    (async () => await createDB())();
  }, []);

  return (
    <div className="App bg-background min-h-screen flex justify-center">
      <div className="inner flex flex-col w-full md:w-1/2">
        <Headbar />
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
