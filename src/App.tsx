import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { StartView } from './views/StartView';

function App() {
  return (
    <div className="App bg-secondary min-h-screen flex justify-center">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <StartView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
