
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REDIRECT = "REDIRECT";
export const REFRESH = "REFRESH";

export const ACTION_REDIRECT = (link: String) => {
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

export const ACTION_REFRESH = () => {
  return {
    type: REFRESH
  };
};
