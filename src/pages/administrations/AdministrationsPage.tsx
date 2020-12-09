import React from 'react';
import { useForm } from "react-hook-form";

const AdministrationPage: React.FC = () => {
    
    var userData = [
        { 'name': 'innov237', 'type': 'super admin' },
        { 'name': 'cedric djiele', 'type': 'admin' },
        { 'name': 'lorent bobo', 'type': 'admin' },
        { 'name': 'sonia', 'type': 'admin' },
    ];

    type Inputs = {
        name: string,
        password: string,
        type: string,
    };

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const onSubmit = (data: any) => {
     
    };
    console.log(watch("name")) // watch input value by passing the name of it

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h1>New user</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form" >
                        <div className="form-row pt-3 pl-2">
                            <div className="form-group col-3">
                                <input type="text" name="name" placeholder="User Email" className="form-control" ref={register({ required: true })} />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-3">
                                <input type="text" name="password" placeholder="User Passworld" className="form-control" ref={register({ required: true })} />
                                {errors.password && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-3">
                                <select name="type" className="form-control" ref={register({ required: true })}>
                                    <option value="">Account type</option>
                                    <option value="admin">Admin</option>
                                    <option value="admin">Super Admin</option>
                                </select>
                                {errors.type && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-3">
                                <input type="submit" value="save" className="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            <div className="card mt-5 p-2">
                <table className="table">
                    <thead>
                        <tr className="theader">
                            <th>User Name</th>
                            <th>User Type</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((res) => {
                            return (<tr key={res.name}>
                                <td>{res.name} </td>
                                <td>{res.type}</td>
                                <td style={{ textAlign: "center" }} className="more__td">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AdministrationPage;