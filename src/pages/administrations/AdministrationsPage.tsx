import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ApiService from '../../services/ApiService';
import { Modal, Button } from "react-bootstrap";

const AdministrationPage: React.FC = () => {


    const [userData, setUserData] = useState<any>([]);
    const [isLoad, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    type Inputs = {
        name: string,
        email: string,
        password: string,
        type: string,
    };

    useEffect(() => {
        getAllAdmin();
    },[]);

    function edit(data : any){
        setName(data.name);
        setEmail(data.email);
        setType(data.type);
        handleShow();
    }

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
            data.name = "";
            setLoader(false);
            getAllAdmin();
        } else {
            setLoader(false);
            alert("error while create admin");
        }

    };


    const enableOrDisabledAdmin = async( id : any, status : String ) =>{
       var data = {
          "id": id,
          "status": status
       };
       console.log(data);
        var response = await ApiService.postData("dashboard/enableOrDisabledAdmin", data);
        if (response.success) {
            alert("Update");
        } else {
            alert("check your connexion an try again");
        }
    }

    const deleteAdmin = async (data : any) =>{
        console.log(data)
        // ROUTE DELETE ADMIN
        // var response = await ApiService.getData("dashboard/deleteAdmin" + data.id);
        // if(response.success){
        //     alert("Delete");
        // }else{
        //     alert("check your connexion an try again");
        // }
    }

    const onUpdate = async (data: any) => {
        setLoader(true);
        console.log(data);
        // ROUTE UPDATE ADMIN ??
        // var response = await ApiService.postData("dashboard/updateAdmin", data);
        // if (response.success) {
        //     // vide le formulaire
        //     setLoader(false);
        //     getAllAdmin();
        // } else {
        //     setLoader(false);
        //     alert("error while create admin");
        // }

    };

    console.log(watch("name")) // watch input value by passing the name of it

    function getModal(){
        return (
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modifier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onUpdate)}>
                        <div className="form" >
                            <div className="form-row pt-3 p-2">
                                <div className="form-group col-12">
                                    <input type="text" value = {name} placeholder="User Name" className="form-control" ref={register({ required: true })} />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="form-group col-12">
                                    <input type="text" value = {email} placeholder="User Email" className="form-control" ref={register({ required: true })} />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="form-group col-12">
                                    <select value= {type} className="form-control" ref={register({ required: true })}>
                                        <option value="admin">Account type</option>
                                        <option value="admin">Admin</option>
                                        <option value="super-admin">Super Admin</option>
                                    </select>
                                    {errors.type && <span>This field is required</span>}
                                </div>
                                {/* <div className="form-group col-12">
                                    {!isLoad && <input type="submit" value="Create" className="btn btn-primary" />}
                                    {isLoad && <button className="btn btn-primary" value="load..." />}
                                </div> */}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="primary" onClick={onUpdate}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div>
            {getModal()}
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((res: any) => {
                            return (<tr key={res.name}>
                                <td>{res.name} </td>
                                <td>{res.email} </td>
                                <td>{res.type}</td>
                                <td className="d-flex">
                                    <div className="form-group mr-1">
                                        <input type="submit" value="Edite" onClick={(e) =>edit(res)} className="btn btn-info" />                  
                                    </div>
                                    <div className="form-group mr-1">
                                        <input type="submit" value="Delete" onClick={(e) => deleteAdmin(res)} className="btn btn-danger" />
                                    </div>
                                    <div className="form-group mr-1">
                                        <input type="submit" value="disable" onClick={(e) => enableOrDisabledAdmin(res.id,'unactivated')} className="btn btn-warning" />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="enable" onClick={(e) => enableOrDisabledAdmin(res.id, 'activated')} className="btn btn-warning" />
                                    </div>
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