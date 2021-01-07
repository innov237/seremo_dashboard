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
  connect
} from 'react-redux'

import { 
  history
} from './config/history';

import { 
  UserDetails
} from "./pages/UserDetails"

import HomePage from './pages/Home';
import LoginPage from './pages/authPage/login';
import ProtectedRoute from "./component/DataComponent"

import './App.css';


import ApiService from './services/ApiService';


class App extends React.Component {


  refresh = async (token: String) => {
    return await ApiService.getData("v1/refresh",{
      headers:{
        'Authorization': `Bearer ${token.replace('"',"")}`
      }
  });
  }

  async componentWillMount(){
    const props:any = this.props
    const {LOGIN, LOGOUT} = props

    const token: String| null = localStorage.getItem("AuthUserData"); 
   
    
  }


  render(){
    return (
   
      <div className="App">
        <Router history={history}>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Suspense fallback = {<UserDetails></UserDetails>}>
              <Switch>
               
                <Route path="/admin" component={ProtectedRoute(HomePage)} />
                <Route path="/login" component={ProtectedRoute(LoginPage)} />
                <Route path="/" component={ProtectedRoute(LoginPage)} />   
              </Switch>
            </Suspense>
        </Router>
      </div >

  );
  }
  
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    LOGIN: (data:any) => dispatch({ type: 'ACTION_LOGIN', payload: data }),
    LOGOUT: () => dispatch({ type: 'ACTION_LOGOUT' }),
  }
}

export default connect(null,mapDispatchToProps)(App);
