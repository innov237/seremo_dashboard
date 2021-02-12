import {
    LOGIN,
    LOGOUT,
    REDIRECT,
    REFRESH,
    BEFORE_LOGOUT
  } from './Actions';
  
  const initializeState: any = {
    user: null,
    token: null,
    isAuthentificated: false,
    linkToRedirect: null,
    pageHasbeRefresh: false,
    beforeLogOut:false
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
           
            return {
                ...state,
                user: null,
                token:null,
                isAuthentificated: false,
                beforeLogOut: false,
                linkToRedirect: false
            };
        
        case REDIRECT:
            return {
                  ...state,
                  linkToRedirect:action.payload
              };

        case BEFORE_LOGOUT:
            return {
                ...state,
                beforeLogOut: true
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