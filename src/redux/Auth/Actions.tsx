
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REDIRECT = "REDIRECT";


export const ACTION_REDIRECT = (link: String) => {
  return { 
    type: REDIRECT, 
    payload: link 
  };
};

export const ACTION_LOGIN = (user: any) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const ACTION_LOGOUT = () => {
  return {
    type: LOGOUT
  };
};
