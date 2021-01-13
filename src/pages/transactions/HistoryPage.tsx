import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import { Modal, Button } from "react-bootstrap";

import ApiService from '../../services/ApiService';

import moment from 'moment'

const datas = [
    {
        avatar: '',
        name: 'Carlos Kameni',
        email: '',
        transaction:'WL00001',
        montant:'123.456',
        status:'PENDING',
    },
    {
        avatar: '',
        name: 'Bell Antoine',
        email: '',
        transaction:'WL000010',
        montant:'123.456',
        status:'ACCEPTED',
    },
    {
        avatar: '',
        name: 'Tataw',
        email: '',
        transaction:'WL000011',        
        montant:'123.456',
        status:'REJECTED',
    },
]
const HistoryPage: React.FC = () => {

    
    const [next, setNext] = useState<string>('');
    const [data, setData] = useState(datas)
    const [prev, setPrev] = useState<string>('');
    const [usersData, setUsersData] = useState<any>([]);
    const [isLoad, setLoader] = useState(true);
    const [show, setShow] = useState(false);
    const history = useHistory();


    const substringURL = (url:string) => {
        const rootURL = `${process.env.REACT_APP_API_URL}/api`
        return url.substring(rootURL.length, url.length);
    }

    const updateAction = (action:string, user:any) => {
        
        const newData = data.map(e => {

            if (e.name == user.name)
                return Object.assign(e, {status:action})
            else
                return e
        })

        setData(newData)

    }

    const getAllUser = async (data:string='') => {
        let url = "v1/users"
        if (data != '')
            url = substringURL(data)

        var response = await ApiService.getData(url);
        setUsersData(response.data);
        setNext(response.next);
        setPrev(response.prev)
        setLoader(false);
    }

    useEffect(() => {
        //getAllUser();
    }, [])

    const up = () => `page-item ${(next) ? '' : 'disabled'}`;
    const down = () => `page-item ${(prev) ? '' : 'disabled'}`;

    const getUserDetail = (usersData: any) => {
        history.push("DetailtransactionUser", usersData);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function opendetail() {
        
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

                    <div className="container-fluid">
                    
                        <h4>Reciever</h4>
                        <div className="row px-10 px-2 py-2">
                            <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                <img src="" style={{ height: "150px", width: "150px" }} />
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                                <p className="text-uppercase font-weight-bold">IS2</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                                <p className="text-uppercase font-weight-bold">Etamé Lauren</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                                <p className="text-uppercase font-weight-bold">CMR</p>
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                                <h5 className="text-uppercase font-weight-bold"> +233778946513</h5>
                                <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                                <p className="pt-0 text-uppercase font-weight-bold">-</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                                <p className="text-uppercase font-weight-bold">MTN</p>
                            </div>
                        </div>


                        <div className="card px-2 py-2 mb-3">
                            <div className="row px-10 px-2 py-2">

                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Status</p>
                                    <h5 className="text-uppercase font-weight-bold">PRENDING</h5>
                                </div>
                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Amount</p>
                                    <h5 className="text-uppercase font-weight-bold">789.645 XAF </h5>

                                </div>
                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Date </p>
                                    <h5 className="text-uppercase font-weight-bold">{ moment(new Date()).format("DD-MMM-YYYY HH:mm:ss")}</h5>
                                </div>
                                 <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Transaction </p>
                                    <h5 className="text-uppercase font-weight-bold">WL00012</h5>
                                </div>
                                <div />
                            </div>
                        </div>
                    </div>

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
            <p className="header__title">Historique des retrait</p>
            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}
            <table className="table">
                <tbody>
                <tr className="theader">
                    <th>Agent</th>
                    <th>Email</th>
                    <th>Montant</th>
                    <th>Transaction</th>
                    <th>Satus</th>
                    <th>More</th>
                </tr>
                
                {data.length > 0 && data.map((res: any,index: any) => {
                    return (<tr key={index}>
                        <td>{res.name}</td>
                        <td>{(res.email) ? res.email : '-'}</td>
                        <td>{res.montant}</td>
                        <td>{res.transaction}</td>
                        <td>{res.status}</td>
                        <td style={{ textAlign: "center" }} className="more__td" onClick={() => opendetail()}>
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
                    <li className={down()} onClick={ () => getAllUser(prev)} ><a className="page-link" >Previous</a></li>
                    
                    <li className={up()} onClick={ () => getAllUser(next)}><a className="page-link" >Next</a></li>
                  </ul>
                </nav>
            </div>
        </div>
    )
}

export default HistoryPage;