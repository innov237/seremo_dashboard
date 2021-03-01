import React, {
  Suspense,
  useEffect
} from 'react';

import {
  Switch,
  Route,
  Router,
  Redirect,
  HashRouter
} from "react-router-dom";

import {
  useDispatch,
  useSelector
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

import {
  ACTION_REFRESH,
  ACTION_LOGIN
} from './redux/Auth/Actions'



const App: React.FC = () => {

  useEffect(() => {
    refreshToken()
  })

  const auth  = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const refreshToken = async() => {
    
    const token = localStorage.getItem("srDash");
        
    if (!auth.pageHasbeRefresh){
      if(token){
        //dispatch(ACTION_REFRESH())
        const request = await ApiService.getData('v1/refresh',{
            headers:{
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
             }
        })

        if (request.response) {
          dispatch(ACTION_LOGIN(request.data))
          localStorage.setItem("srDash", request.data.token);
         }else{
           localStorage.removeItem("srDash");
            dispatch(ACTION_REFRESH())
          }

      }else{
          localStorage.removeItem("srDash");
          dispatch(ACTION_REFRESH())
      }
    } 
    
  }


      return (
        <div className="App">
          {
            (auth.pageHasbeRefresh) ?
                <HashRouter>
                  <Switch>
                      <ProtectedRoute excat path="/admin" component={HomePage} />
                      <ProtectedRoute excat path="/admin/administrations" component={HomePage} ></ProtectedRoute>
                      <ProtectedRoute excat path="/admin/access-log" component={HomePage}></ProtectedRoute>
                      <ProtectedRoute excat path="/admin/detailtransactionUser" component={HomePage}></ProtectedRoute>
                      <ProtectedRoute excat path="/admin/all-users" component={HomePage} />
                      <ProtectedRoute excat path="/admin/dashboard" component={HomePage} />
                      <ProtectedRoute excat path="/admin/retrait" component={HomePage} />
                      <ProtectedRoute excat path="/admin/history" component={HomePage} />
                      <ProtectedRoute excat path="/admin/dashboard" component={HomePage} />
                      
                      <Route path="/login" component={LoginPage} />
                      <Route path="/" component={LoginPage} />  
                    </Switch> 
                </HashRouter>
            : <></>
          }
        </div>
      );
  
  
}



export default App;
