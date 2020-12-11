import React, { useState, useEffect } from 'react'

const LoginPage: React.FC = () => {

    // const [isLoad, setLoader] = useState(false);

    // const imageUrl = "https://seremoworld.com/seremoapi/public/storage/";

    useEffect(() => {
       
    }, [])

    return (
        <div className="bg-primary  d-flex justify-content-center align-items-center" style={{height: "100vh"}}>

                <div className="bg-light  rounded py-5 px-5" style={{ height: "400px", width: "500px" }}>
                    <div className="form  ">
                    <div className="mb-3" >
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Entrer votre Email"/>
                            {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" placeholder="Entrer votre Password" className="form-control flex-1 mr-1" />
                        </div>
                    <div className="mt-4">
                        <button type="button" className="btn btn-primary btn-lg btn-block">Login</button>
                    </div>
                    </div>
                </div>
           
        </div>
    )
}

export default LoginPage;