import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ApiService from '../../services/ApiService';

const AdministrationPage: React.FC = () => {


    const [userData, setUserData] = useState<any>([]);
    const [isLoad, setLoader] = useState(false);

    type Inputs = {
        name: string,
        email: string,
        password: string,
        type: string,
    };

    useEffect(() => {
        getAllAdmin();
    },[userData]);

    const getAllAdmin = async () => {
        var response = await ApiService.getData("dashboard/getAllAdmin");
        setUserData(response);
    }

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const onSubmit = async (data: any) => {
        setLoader(true);
        console.log(data);

        var response = await ApiService.postData("dashboard/createAdmin", data);

        if (response.success) {
            // vide le formulaire
            setLoader(false);
            getAllAdmin();
        } else {
            setLoader(false);
            alert("error while create admin");
        }

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
                                {!isLoad && <input type="submit" value="Create" className="btn btn-primary" />}
                                {isLoad && <button className="btn btn-primary" value="load..." />}
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
                            <th>Email</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((res: any) => {
                            return (<tr key={res.name}>
                                <td>{res.name} </td>
                                <td>{res.email} </td>
                                <td>{res.type}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AdministrationPage;