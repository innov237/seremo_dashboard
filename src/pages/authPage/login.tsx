import React, { useState, useEffect } from 'react'

import { Redirect } from "react-router-dom";
import {
    useDispatch,
    useSelector
} from 'react-redux'

import {
    ACTION_LOGIN,
    ACTION_LOGOUT
} from '../../redux/Auth/Actions'


import {
    AppRoutes
} from '../AppRoute'

import ApiService from '../../services/ApiService';
import { history } from "../../config/history";


const LoginPage: React.FC = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [msg, setmsg] = useState("");
    const [checked, setChecked] = useState(true);
    
    const auth  = useSelector((state: any) => state.auth);

    const disabled = (email.length && password.length) ? false : true

    const dispatch = useDispatch();
     
    if (auth.linkToRedirect){
        
        return <Redirect to='/admin/dashboard' />
       
    }

    const login = async () => {
        setmsg('')
        
        var datapost = {
            data:{
               attributes:{
                "user_email": email.trim(),
                "password": password.trim(),
               }
            }
        };

        var response = await ApiService.postData("v1/login", datapost);

        if (response.response) {

            if (checked)
                localStorage.setItem("srDash", response.data.token);
            let log = saveLog(response.data);           
            
        } else {
            setmsg(response.message);
        }

    }

    const saveLog = async (data: any) => {
        
        var datalog = {
            "id": data.user.id,
            "status": "in"
        }
        
        var response = await ApiService.postData("dashboard/createAccessLog", datalog);
        
        if(response.success){
            dispatch(ACTION_LOGIN(data))
            return true;
        }else{
            return false;
        }
    }

    function getEmail(e: any) {
        setEmail(e.target.value);
    }
    
    function getpassword(e: any) {
        setPass(e.target.value);
    }

    return (
       
        <div className="bg-primary  d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#28A3E6 !important" }}>

            <div className="bg-light  rounded py-5 px-5" style={{ height: "400px", width: "500px" }}>
                <div className="form  ">
                    <div className="mb-3" >
                        <label>Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => { getEmail(e) }} placeholder="Entrer votre Email" required/>
                        {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input required type="password" placeholder="Entrer votre Password" value={password} id="password" onChange={(e) => { getpassword(e) }} className="form-control flex-1 mr-1" />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" onChange={() => setChecked(!checked)} defaultChecked={checked}/>
                        <label className="form-check-label">Resté connecté</label>
                    </div>
                    <div className="mt-3">
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={(e) => login()}  disabled={disabled}>Login</button>
                        <p></p>
                        <p className="text-danger">{msg}</p>
                    </div>
                </div>
            </div>

        </div>
        )
}

export default LoginPage;