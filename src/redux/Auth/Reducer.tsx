import {
    LOGIN,
    LOGOUT,
    REDIRECT,
    REFRESH
  } from './Actions';
  
  const initializeState: any = {
    user: {},
    token: null,
    isAuthentificated: false,
    linkToRedirect: null,
    pageHasbeRefresh: false
  };
  
  export const authReducer = (
    state=initializeState,
    action: any
  ): any => {
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthentificated: true,
                pageHasbeRefresh: true,
                linkToRedirect: true
            };
        case LOGOUT:
            localStorage.removeItem("AuthUserData");
            return {
                ...state,
                user: {},
                token:null,
                redirect: null,
                isAuthentificated: false
            };
        
        case REDIRECT:
            return {
                  ...state,
                  linkToRedirect:action.payload
              };

        case REFRESH:
            return {
                  ...state,
                  pageHasbeRefresh: true,
                  //isAuthentificated: action.payload
              };
        default:
            return state;
    }
  }; 