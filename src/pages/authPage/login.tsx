import React, { useState, useEffect } from 'react'
import { history } from "../../config/history";
import ApiService from '../../services/ApiService';


const LoginPage: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [msg, setmsg] = useState("");

    // const imageUrl = "https://seremoworld.com/seremoapi/public/storage/";

    useEffect(() => {

    }, [])

    const login = async () => {
        var datapost = {
            "email": email,
            "password": password,
        };

        var response = await ApiService.postData("dashboard/login", datapost);

        if (response.success) {
            localStorage.setItem("AuthUserData", JSON.stringify(response.data));
            console.log(response.data);
            let log = saveLog(response.data);
            console.log(log);
            history.push("/admin/transactions");
        } else {
            setmsg(response.message);
        }

    }

    const saveLog = async (data: any) => {
        var datalog = {
            "id": data.id,
            "status": "in"
        }
        console.log(datalog);
        var response = await ApiService.postData("dashboard/createAccessLog", datalog);
        if(response.success){
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
        <div className="bg-primary  d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>

            <div className="bg-light  rounded py-5 px-5" style={{ height: "400px", width: "500px" }}>
                <div className="form  ">
                    <div className="mb-3" >
                        <label>Email</label>
                        <input type="email" className="form-control" id="email" onChange={(e) => { getEmail(e) }} placeholder="Entrer votre Email" />
                        {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" placeholder="Entrer votre Password" id="password" onChange={(e) => { getpassword(e) }} className="form-control flex-1 mr-1" />
                    </div>
                    <div className="mt-4">
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={(e) => login()} >Login</button>
                        <p></p>
                        <p className="text-danger">{msg}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage;