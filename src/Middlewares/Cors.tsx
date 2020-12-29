import axios from "axios";

import {
    LOGIN,
    ACTION_REDIRECT
 } from "../redux/Auth/Actions";

 import { history } from "../config/history";
 

export const CorsMiddleware = ({ dispatch }:any) => (next:any) => (action:any) => {
  next(action);

  if (action.type === "LOGIN") {
        console.log('in middleware')
        console.log(action.payload)
        //history.push("/admin/transactions")
        //dispatch(apiSuccess({ response: data }));
        //dispatch(ACTION_REDIRECT("/admin/transactions"))
  }
};