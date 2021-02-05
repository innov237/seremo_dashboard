import React, {
  Suspense,
  useEffect
} from 'react';

import {
  Switch,
  Route,
  Router
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
    
    const token = localStorage.getItem("AuthUserData");
    
    
    if (!auth.pageHasbeRefresh){
      if(token){
        dispatch(ACTION_REFRESH())
        const request = await ApiService.getData('v1/refresh',{
            headers:{
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
             }
        })

        if(request.response){
          dispatch(ACTION_LOGIN(request.data))
          localStorage.setItem("AuthUserData", request.data.token);
         }else
          dispatch(ACTION_REFRESH())

    }else{
        localStorage.removeItem("AuthUserData");
        dispatch(ACTION_REFRESH())
    }
    } 
    
   }

    
    return (
   
      <div className="App">
      <Router history={history}>
              <Suspense fallback = {<UserDetails></UserDetails>}>
              
       {
         (auth.pageHasbeRefresh) ?
             <Switch>
               
                <Route path="/admin" component={ProtectedRoute(HomePage)} />
                <Route path="/login" component={LoginPage} />
                <Route path="/" component={LoginPage} />  
             </Switch> 
               :

        <></>
       }
        
            </Suspense>
        </Router>
      </div >

  );
  
  
}



export default App;
