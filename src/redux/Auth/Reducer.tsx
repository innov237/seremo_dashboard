import {
    LOGIN,
    LOGOUT,
    REDIRECT
  } from './Actions';
  
  const initializeState: any = {
    user: {},
    isAuthentificated: true,
    linkToRedirect: null,
  };
  
  export const authReducer = (
    state=initializeState,
    action: any
  ): any => {
    switch (action.type) {
        case LOGIN:
    
            return {
                ...state,
                user: action.payload,
                isAuthentificated: true,
                linkToRedirect: '/admin/transaction'
            };
        case LOGOUT:
            return {
                ...state,
                user: {},
                redirect: null,
                isAuthentificated: false
            };
        
        case REDIRECT:
            return {
                  ...state,
                  linkToRedirect:action.payload
              };
        default:
            return state;
    }
  };