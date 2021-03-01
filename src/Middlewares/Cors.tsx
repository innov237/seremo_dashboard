
import {
	useHistory
} from 'react-router-dom'

export const CorsMiddleware = ({ dispatch }:any) => (next:any) => (action:any) => {
  
  	if ("LOGOUT" === action.type){
  		localStorage.removeItem("AuthUserData");
		next(action);
	}else
		next(action);
};