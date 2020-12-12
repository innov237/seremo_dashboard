import React, {Suspense} from 'react';
import './App.css';
import HomePage from './pages/Home';
import {
  BrowserRouter as Routers,
  Switch,
  Route,
  Link,
  Router
} from "react-router-dom";
import LoginPage from './pages/authPage/login';
import { UserDetails} from "./pages/UserDetails";
import {history} from './config/history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Suspense fallback = {<UserDetails></UserDetails>}>
            <Switch>
              <Route path="/admin">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
            </Switch>
          </Suspense>
      </Router>
    </div >
  );
}

export default App;
