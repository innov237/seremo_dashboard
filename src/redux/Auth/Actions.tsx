
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REDIRECT = "REDIRECT";
export const REFRESH = "REFRESH";
export const BEFORE_LOGOUT = "BEFORE_LOGOUT";


export const ACTION_REDIRECT = (link: boolean = false) => {
  return { 
    type: REDIRECT, 
    payload: link 
  };
};

export const ACTION_LOGIN = (data: any) => {
  
  return {
    type: LOGIN,
    payload: data
  };
};

export const ACTION_LOGOUT = () => {
  return {
    type: LOGOUT
  };
};

export const BEFORE_ACTION_LOGOUT = () => {
  return {
    type: BEFORE_LOGOUT
  };
};

export const ACTION_REFRESH = (data:boolean = false) => {
  return {
    type: REFRESH,
    payload: data
  };
};
