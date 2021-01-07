
export const CorsMiddleware = ({ dispatch }:any) => (next:any) => (action:any) => {
  next(action);

  if (action.type === "LOGIN") {
        console.log('in middleware LOGIN')
        
  }

  if (action.type === "LOGOUT") {
    console.log('in middleware LOGOUT')
    
  }

};