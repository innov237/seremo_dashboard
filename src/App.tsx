import React, {
  Suspense
} from 'react';

import {
  BrowserRouter as Routers,
  Switch,
  Route,
  Redirect,
  Router
} from "react-router-dom";

import {  
  useSelector 
} from 'react-redux';

import {
  history
} from './config/history';

import { 
  UserDetails
} from "./pages/UserDetails";



import HomePage from './pages/Home';
import LoginPage from './pages/authPage/login';

//import ProtectedRoute from "./component/Route";

import ProtectedRoute from "./component/DataComponent"

import './App.css';


function App() {


  const auth  = useSelector((state: any) => state.auth);

  React.useEffect(() => {
    
  })



  return (
   
        <div className="App">
          <Router history={history}>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
              <Suspense fallback = {<UserDetails></UserDetails>}>
                <Switch>
                  
                  <Route path="/admin" component={ProtectedRoute(HomePage)} />
                  <Route path="/login" component={LoginPage} />
                   
                </Switch>
              </Suspense>
          </Router>
        </div >
  
  );
}

export default App;
