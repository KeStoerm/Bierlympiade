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
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseOptions, initializeApp } from '@firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB9BeaO_r0VDt6YO3trOTkVBLuwhsHMg9I",
  databaseURL: "https://bierlympiade-70679-default-rtdb.europe-west1.firebasedatabase.app/",
  authDomain: "bierlympiade-70679.web.app",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

// signInWithPopup(auth, provider)
//   .then((result) => {
//     console.log("worked")
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result)!;
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     console.log(user);
//     // ...
//   }).catch((error) => {
//     console.log(error)
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

// register();


function App() {
  useEffect(() => {
    annealGamePlan(games, pointBuckets, gameDays);
    (async () => await createDB())();
  });

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
