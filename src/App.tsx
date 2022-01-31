import React, { useEffect, useState } from 'react';
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
import { authenticateWithGoogle } from './authentication/authenticationUtils';
import { getAuth } from "firebase/auth";
import { firebaseConfig } from './config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const app = initializeApp(firebaseConfig);

const auth = getAuth();

register();

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      user || authenticateWithGoogle();
      annealGamePlan(games, pointBuckets, gameDays);
      (async () => await createDB())();
    }
  }, [loading]);

  return (
    <div className="App bg-background min-h-screen flex justify-center">
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
