import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import moment from 'moment';

import { useSelector } from 'react-redux'

import ApiService from '../../services/ApiService';


const UsersListPage: React.FC = () => {

    
    const [next, setNext] = useState<string>('');

    const [res, setRes] = useState<any>(null);
    const [data, setData] = useState([])
    const [prev, setPrev] = useState<string>('');
    const [usersData, setUsersData] = useState<any>([]);
    const [show, setShow] = useState(false);
    const [isLoad, setLoader] = useState(true);
    const history = useHistory();

    const auth  = useSelector((state: any) => state.auth);

    const substringURL = (url:string) => {
        const rootURL = `${process.env.REACT_APP_API_URL}/api`
        return url.substring(rootURL.length, url.length);
    }

    const updateAction = (action:string, user:any) => {
        


    }

    const getAllCashOut = async (data:string='') => {
        let url = "wallet/cash-out/list"
        if (data != '')
            url = substringURL(data)

        const header = {
            "headers":{
                "Authorization": `Bearer ${auth.token}`
            }
        }

        var response = await ApiService.postData(url, null,header);

        if (response.success){
            setData(response.data.data);
            setNext(response.data.next_page_url);
            setPrev(response.data.prev_page_url) 
        }
        
        
        setLoader(false);
    }

    useEffect(() => {
        getAllCashOut();
        setLoader(false);
    }, [])

    const up = () => `page-item ${(next) ? '' : 'disabled'}`;
    const down = () => `page-item ${(prev) ? '' : 'disabled'}`;

    const getUserDetail = (usersData: any) => {
        history.push("DetailtransactionUser", usersData);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function opendetail(res:any) {
        
        setRes(res);
        handleShow();
    }

    const  approuve = async(res:any) => {
        setLoader(true);
        

        const header = {
            "headers":{
                "Authorization": `Bearer ${auth.token}`
            }
        }

        var response = await ApiService.postData("wallet/cash-out/approve", {cash_out_request_id:res.id},header);

        if (response.success) {
            
            alert("Operation success");
            setLoader(false);
            getAllCashOut();
        } else {
            setLoader(false);
            alert("Opertaion failed. Contact Admin");
        }
    }

    function getModalDetail() {
        return (
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="full-width-modal"

            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    { (res) ? <div className="container-fluid">
                                        
                                            <h4>Reciever</h4>
                                            <div className="row px-10 px-2 py-2">
                                                <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                                    <img src={res.user.user_avatar} style={{ height: "150px", width: "150px" }} />
                                                </div>
                    
                                                <div className="col-4  mt-2">
                                                    <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                                                    <p className="text-uppercase font-weight-bold">{res.user.user_code}</p>
                                                    <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                                                    <p className="text-uppercase font-weight-bold">{res.user.user_name}</p>
                                                    <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                                                    <p className="text-uppercase font-weight-bold"><img src={res.user.country.flag} className="user__avatar" alt="avatar" />{res.user.country.name}</p>
                                                </div>
                    
                                                <div className="col-4  mt-2">
                                                    <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                                                    <h5 className="text-uppercase font-weight-bold">{res.user.user_phone_number}</h5>
                                                    <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                                                    <p className="pt-0 text-uppercase font-weight-bold">-</p>
                                                    <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                                                    <p className="text-uppercase font-weight-bold">-</p>
                                                </div>
                                            </div>
                    
                    
                                            <div className="card px-2 py-2 mb-3">
                                                <div className="row px-10 px-2 py-2">
                    
                                                    <div className="col-6  mt-2">
                                                        <p className="p-0 m-0 text-primary">Status</p>
                                                        <h5 className="text-uppercase font-weight-bold">{res.status}</h5>
                                                    </div>
                                                    <div className="col-6  mt-2">
                                                        <p className="p-0 m-0 text-primary">Amount</p>
                                                        <h5 className="text-uppercase font-weight-bold">{res.amount} {res.user.country.currency}</h5>
                    
                                                    </div>
                                                    <div className="col-6  mt-2">
                                                        <p className="p-0 m-0 text-primary">Date </p>
                                                        <h5 className="text-uppercase font-weight-bold">{ moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")}</h5>
                                                    </div>
                                                     <div className="col-6  mt-2">
                                                        <p className="p-0 m-0 text-primary">Transaction </p>
                                                        <h5 className="text-uppercase font-weight-bold">{res.id}</h5>
                                                    </div>
                                                    <div />
                                                </div>
                                            </div>
                                        </div>: <div></div>
                                   }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div>
         {getModalDetail()}
            <p className="header__title">Withdrawal request
</p>
            <div className="row filter__header">
                
                <div className="col-md-4 d-flex justify-content-end">
                    
                        <div className="form-group col-md-12">
                            
                            <select id="inputState"  className="form-control" >
                                <option value="All">All</option>
                                <option value="All">All</option>
                                <option value="All">All</option>
                                <option value="All">All</option>
                                <option value="All">All</option>
                            </select>
                        </div>
                       
                    </div>
                </div>
            
            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}

            <table className="table">
                <tbody>
                <tr className="theader">
                    
                    <th>Demandeur</th>
                    <th>Phone number</th>
                    
                    <th>Provider</th>
                    
                    <th>Montant</th>
                    <th>Currency</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>More</th>

                </tr>
                
                {data.length > 0 && data.map((res: any,index: any) => {
                    return (<tr key={index}>
                        <td>
                            <div><img src={res.user.user_avatar} className="user__avatar" alt="avatar" /> <span>{res.user.user_name}</span></div>
                            <div className="d-flex justify-content-start"><img src={res.user.country.flag} className="user__avatar" alt="avatar" /> <span className="span__contry">{res.user.country.name} ➚ </span> </div>

                         </td>
                        
                        <td>{res.user.user_phone_number}</td>
                        <td>{res.provider}</td>
                        
                        <td>{res.amount}</td>
                        <td>{res.user.country.currency}</td>
                        <td>{res.status}</td>
                        <td className="d-flex">
                                    
                                    <div className="form-group mr-1" onClick={() => updateAction("COMPLETED",res)} style={{display: (res.status != "PENDING") ? 'none' : 'block'}}>
                                        <input type="submit" value="Accepter" className="btn btn-primary" />
                                    </div>
                                    
                                   
                        </td>
                        <td style={{ textAlign: "center" }} className="more__td" onClick= { () => opendetail(res) }>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
             <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={down()} onClick={ () => getAllCashOut(prev)} ><a className="page-link" >Previous</a></li>
                    
                    <li className={up()} onClick={ () => getAllCashOut(next)}><a className="page-link" >Next</a></li>
                  </ul>
                </nav>
            </div>
        </div>
    )
}

export default UsersListPage;