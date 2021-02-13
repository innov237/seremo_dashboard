import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import { Modal, Button } from "react-bootstrap";

import ApiService from '../../services/ApiService';

import moment from 'moment'

const HistoryPage: React.FC = () => {

    
    const [next, setNext] = useState<string>('');
   
    const [current, setCurrent] = useState<any>(null)
    const [prev, setPrev] = useState<string>('');
    const [usersData, setUsersData] = useState<any>([]);
    const [isLoad, setLoader] = useState(true);
    const [show, setShow] = useState(false);
    const history = useHistory();


    const substringURL = (url:string) => {
        const rootURL = `${process.env.REACT_APP_API_URL}/api`
        return url.substring(rootURL.length, url.length);
    }

    
    const getAllHistory = async (data:string='') => {
        let url = "v1/history"
        if (data != '')
            url = substringURL(data)

        var response = await ApiService.getData(url);
        setUsersData(response.data);
        setNext(response.next_page_url);
        setPrev(response.prev_page_url)
        setLoader(false);
    }

    useEffect(() => {
        getAllHistory();
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
        
        setCurrent(res)
        handleShow();
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
                    {
                        (current) ? 
                        <div className="container-fluid">

                        <h4>Reciever</h4>
                        <div className="row px-10 px-2 py-2">
                            <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                <img src="http://localhost:8000/api/v1/media/user_avatar.jpg" style={{ height: "150px", width: "150px" }} />
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                                <p className="text-uppercase font-weight-bold">{current.request.user.user_code}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                                <p className="text-uppercase font-weight-bold">{current.request.user.user_name}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                                <p className="text-uppercase font-weight-bold"><img src={current.request.user.country.flag} className="user__avatar" alt="avatar" />{current.request.user.country.name}</p>
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                                <h5 className="text-uppercase font-weight-bold">{current.request.user.user_phone_number}</h5>
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
                                    <h5 className="text-uppercase font-weight-bold">{current.request.status}</h5>
                                </div>
                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Amount</p>
                                    <h5 className="text-uppercase font-weight-bold">{current.request.amount} {current.request.user.country.currency} </h5>

                                </div>
                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Date </p>
                                    <h5 className="text-uppercase font-weight-bold">{ moment(current.request.created_at).format("DD-MMM-YYYY HH:mm:ss")}</h5>
                                </div>
                                 <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Wallet </p>
                                    <h5 className="text-uppercase font-weight-bold">{current.wallet_id}</h5>
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
            <p className="header__title">Historical</p>
            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}
            <div className="row filter__header">
                
                <div className="col-md-12 d-flex justify-content-end">
                    <div className="row">
                        <div className="form-group col-md-12">  
                            <select id="inputState"  className="form-control" onChange={(e:any) => console.log(e.target.value)} >
                                <option value="All">All</option>
                                <option value="TREATED">TREATED</option>
                                <option value="APPROVED">APPROVED</option>       
                            </select>
                        </div>
                       
                    </div>
                </div>
            </div>
            <table className="table">
                <tbody>
                <tr className="theader">
                    <th>Agent</th>
                    <th>Email</th>
                    <th>Montant</th>
                    <th>Currency</th>
                    <th>Wallet</th>
                    <th>Satus</th>
                    <th>More</th>
                </tr>
                
                {usersData.length > 0 && usersData.map((res: any,index: any) => {
                    return (<tr key={index}>
                        <td>{res.agent.user_name}</td>
                        <td>{(res.agent.user_email)}</td>
                        <td>{res.request.amount}</td>
                        <td>{res.request.user.country.currency}</td>
                        <td>{res.wallet_id}</td>
                        <td>{res.request.status}</td>
                        <td style={{ textAlign: "center" }} className="more__td" onClick={() => opendetail(res)}>
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
                    <li className={down()} onClick={ () => (prev) ? getAllHistory(prev): ''} ><a className="page-link" >Previous</a></li>
                    
                    <li className={up()} onClick={ () =>  (next) ? getAllHistory(next) : ''}><a className="page-link" >Next</a></li>
                  </ul>
                </nav>
            </div>
        </div>
    )
}

export default HistoryPage;