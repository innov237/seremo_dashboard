import React from 'react';
import { useForm } from "react-hook-form";

const AdministrationPage: React.FC = () => {

    var userData = [
        { 'id': 1, 'name': 'innov237', 'type': 'super admin', 'status': 'activated' },
        { 'id': 2, 'name': 'cedric djiele', 'type': 'admin', 'status': 'activated' },
        { 'id': 3, 'name': 'lorent bobo', 'type': 'admin', 'statut': 'activated' },
        { 'id': 4, 'name': 'sonia', 'type': 'admin', 'status': 'activated' },
    ];

    type Inputs = {
        name: string,
        email: string,
        password: string,
        type: string,
    };

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const onSubmit = (data: any) => {
        console.log(data);
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
                        <div className="form-row pt-3 p-2">
                            <div className="form-group col-3">
                                <input type="text" name="name" placeholder="User Name" className="form-control" ref={register({ required: true })} />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-3">
                                <input type="text" name="email" placeholder="User Email" className="form-control" ref={register({ required: true })} />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-3">
                                <input type="text" name="password" placeholder="User Passworld" className="form-control" ref={register({ required: true })} />
                                {errors.password && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-3">
                                <select name="type" className="form-control" ref={register({ required: true })}>
                                    <option value="admin">Account type</option>
                                    <option value="admin">Admin</option>
                                    <option value="super-admin">Super Admin</option>
                                </select>
                                {errors.type && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-12">
                                <input type="submit" value="Create" className="btn btn-primary" />
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