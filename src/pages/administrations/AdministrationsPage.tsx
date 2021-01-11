import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ApiService from '../../services/ApiService';
import { Modal, Button } from "react-bootstrap";

import {
    useSelector
} from 'react-redux'

const AdministrationPage: React.FC = () => {


    const [userData, setUserData] = useState<any>([]);
    const [isLoad, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [ID, setID] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [roles, setRoles] = useState([]);

    const auth  = useSelector((state: any) => state.auth);



    type Inputs = {
        name: string,
        email: string,
        password: string,
        type: string,
    };

    useEffect(() => {
        getAllRoles();
        getAllAdmin();
    }, []);

    function edit(res: any, role:any) {
        setName(res.attributes.name);
        setEmail(res.attributes.email);
        setType(role.id);
        setID(res.id);
        handleShow();
    }

    const getAllAdmin = async () => {
        var response = await ApiService.getData("v1/admins");
        setUserData(response.data);
    }

    const getAllRoles = async () => {
        var response = await ApiService.getData("v1/roles");
        setRoles(response.data);
    }

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const onSubmit = async (data: any) => {
        setLoader(true);
        

        const posData = {
            "data":{
                "attributes":data
            }
        }

        var response = await ApiService.postData("v1/admins", posData);

        if (response.data.id) {
            
            alert("Admin have been created");
            setLoader(false);
            getAllAdmin();
        } else {
            setLoader(false);
            alert("error while create admin");
        }

        //setLoader(true);

    };


    const enableOrDisabledAdmin = async (data: any) => {
        var postData = {
            data:{
                attributes: {
                    account_status: (data.attributes.account_status == "actived") ? "unactived" : "actived"
                }
            }
        };
        
        var response = await ApiService.patchData("v1/admins/" + data.id,postData);
        if (response.data.id) {
            alert("Update");
            getAllAdmin();
        } else {
            alert("check your connexion an try again");
        }
    }
    
    const deleteAdmin = async (data: any) => {
        
        var response = await ApiService.deleteData("v1/admins/" + data.id);
        
         if(response){
             alert("Delete");
             getAllAdmin()
         }else{
             alert("check your connexion an try again");
         }
    }

    const onUpdate = async (data: any) => {
        setLoader(true);
        
        const posData = {
            data:{
                attributes:{
                    name,
                    email,
                    role_id:type
                }
            }
        }
        

        var response = await ApiService.patchData("v1/admins/" + ID,posData);
        if (response.data.id) {

            alert("Update");
            handleClose();
            getAllAdmin();

        } else {
            alert("error while create admin");
        }
        

        setLoader(false);

    };

    

    function getModal() {
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
                                    <input type="text" value={name} placeholder="User Name" onChange = {evt => setName(evt.target.value)} className="form-control" ref={register({ required: true })} />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="form-group col-12">
                                    <input type="text" value={email} placeholder="User Email" 
                                        onChange = {evt => setEmail(evt.target.value)}
                                    className="form-control" ref={register({ required: true })} />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="form-group col-12" style={{display: (auth.user.id== type) ? 'none' : 'block'}}>
                                    <select onChange={(evt:any) =>  setType(evt.target.value)} className="form-control" ref={register({ required: true })}>
                                        {
                                        roles.map((e:any) => 
                                            <option 
                                                value={e.id} key={e.id}
                                                selected={type == e.id}
                                            >{e.attributes.name}</option>
                                        )
                                    }
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
            <p className="header__title pb-2">Administrations</p>
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
                            <div className="form-group col-3" >
                                <select name="role_id" className="form-control" ref={register({ required: true })}>
                                    {
                                        roles.map((e:any) => 
                                            <option value={e.id} key={e.id} >{e.attributes.name}</option>
                                        )
                                    }
                                  
                                </select>
                                {errors.type && <span>This field is required</span>}
                            </div>
                            <div className="form-group col-12">
                                <input type="submit" value="Create account" className="btn btn-primary" disabled={isLoad}/>
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
                            const statuts = (res.attributes.account_status == 'actived') ? 'Unactived' : 'Actived'
                            

                            const role:any = roles.find((e:any) => e.id == res.relationships.roles.data[0].id)

                            

                            return (<tr key={res.attributes.name}>
                                <td>{res.attributes.name} </td>
                                <td>{res.attributes.email} </td>
                                <td>{role.attributes.name}</td>
                                <td className="d-flex">
                                    <div className="form-group mr-1">
                                        <input type="submit" value="Edite" onClick={(e) => edit(res, role)} className="btn btn-info " />
                                    </div>
                                    <div className="form-group mr-1" style={{display: (auth.user.id== res.id) ? 'none' : 'block'}}>
                                        <input type="submit" value="Delete" onClick={(e) => deleteAdmin(res)} className="btn btn-danger" />
                                    </div>
                                    <div className="form-group mr-1" style={{display: (auth.user.id== res.id) ? 'none' : 'block'}}>
                                        <input type="submit" value={statuts} onClick={(e) => enableOrDisabledAdmin(res)} className="btn btn-warning" />
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