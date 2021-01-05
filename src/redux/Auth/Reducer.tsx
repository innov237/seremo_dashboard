import {
    LOGIN,
    LOGOUT,
    REDIRECT
  } from './Actions';
  
  const initializeState: any = {
    user: {},
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvcmVmcmVzaCIsImlhdCI6MTYwOTc1NTAwMCwibmJmIjoxNjA5NzU1MDIxLCJqdGkiOiJSVW12cGxLUGVvTW5hT0lDIiwic3ViIjo1LCJwcnYiOiIxNmZjZjU4NjA0NzNmNjJlZjdjZTUzZDRkYjY3YTFjZDIxZDBjMjczIn0.aztoe0HqIHKxrQGm2cN7GZoVSA2nfqwOaxCERyCfc3Q",
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
                user: action.payload.user,
                token: action.payload.token,
                isAuthentificated: true,
                linkToRedirect: '/admin/transaction'
            };
        case LOGOUT:
          localStorage.removeItem("AuthUserData");
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