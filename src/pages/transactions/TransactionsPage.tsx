
import React, { useState, useEffect } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
// import { history } from "../../config/history";
import { useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import ApiService from '../../services/ApiService';


import moment from 'moment';

const statusRequest = [
  {
    id:1,
    label: 'PENDING'
  },
  {
    id:2,
    label: 'REJECTED'
  },
  {
    id:3,
    label: 'ACCEPTED'
  },
]

const TrasactionPage: React.FC = () => {

    const history = useHistory();

    const [selectOptionValue, setSelectOptionValue] = useState('status')
    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [movement, setMovement] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [currentTransaction, getCurrentTransaction] = useState<any>(null);
    const [activeItem, setActiveItem] = useState('Request');
    const [csvData, getCSVData] = useState<any[]>([]);

    const [next, setNext] = useState<any[]>([]);
    const [prev, setPrev] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('All');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    

    useEffect(() => {
        getAllTransferFc();

    }, [])


    const getAllMovement = async () => {

        var response = await ApiService.getData("v1/movements");
        setMovement(response)

    };

    const _filterRequest = (filter:string): void => {
        getAllTransfer([]);
    	setStatus(filter);

    	if (filter == 'All')
            getAllRequestFc();
        else
            getAllRequestFc(filter);
    }

    const _filterTransaction = (filter:string): void => {
        getAllTransfer([]);
    	setStatus(filter);

    	if (filter == 'All')
          getAllTransferFc();
        else
          getAllTransferFc(filter);
    }

    const updateStatus  = (filter:string): void => {
        if (activeItem == 'Transfer')
            _filterTransaction(filter)
        else
            _filterRequest(filter)
    };

    const getAllTransferFc = async (param:any | null = null) => {
        getAllMovement();
        setLoader(true);
        getAllTransfer([]);
        const url =  (param != null) ? `v1/transactions?type=${param}` : `v1/transactions`;

        setActiveItem('Transfer');

        var response = await ApiService.getData(url);

        getAllTransfer(response.data);
        formatDataToCsv(response.data);
        setLoader(false);

        setNext(response.first_page_url);
        setPrev(response.first_page_url);
    };


    const getAllRequestFc = async (param:any | null = null) => {
        setLoader(true);
        getAllTransfer([]);
        setActiveItem('Request');
        setMovement(statusRequest)
        const url =  (param != null) ? `v1/requests?type=${param}` : `v1/requests`;
        var response = await ApiService.getData(url);

        getAllTransfer(response.data);
        formatDataToCsv(response.data);
        setLoader(false);
    };

    function filterByStatus(value: any) {

        const filterData = transferData.filter(elt => elt.status.toLowerCase() === value.toLowerCase());

        if (filterData != null) {
            getAllTransfer(filterData);
            formatDataToCsv(filterData);
        } else {
            getAllTransfer([]);
        }

    }

    const search = async (value: any) => {
        getAllMovement();
        setLoader(true);
        getAllTransfer([]);
        var res = await ApiService.getData(`v1/transactions?code=${value}`);
        
        getAllTransfer(res.data);
        setLoader(false);
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

                    {(currentTransaction !== null) && <div className="container-fluid">
                    <h4>Sender</h4>
                        <div className="row">
                            <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                <img src={ApiService.imageUrl + currentTransaction.sender?.user_avatar} style={{ height: "150px", width: "150px" }} />
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                                <p className="text-uppercase font-weight-bold"> {currentTransaction.sender?.user_code}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.sender?.user_name} {currentTransaction.sender?.['user_last_name']}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.sender?.country.name}</p>
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                                <h5 className="text-uppercase font-weight-bold"> {currentTransaction.sender?.user_phone_number}</h5>
                                <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                                <p className="pt-0 text-uppercase font-weight-bold">{currentTransaction.sender?.user_email}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.sender?.provider_name}</p>
                            </div>
                        </div>
                        <hr />
                        <h4>Reciever</h4>
                        <div className="row px-10 px-2 py-2">
                            <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                <img src={ApiService.imageUrl + currentTransaction.receiver?.user_avatar} style={{ height: "150px", width: "150px" }} />
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                                <p className="text-uppercase font-weight-bold"> {currentTransaction.receiver?.user_code}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.receiver?.user_name} {currentTransaction.receiver?.['user_last_name']}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.sender?.country.name}</p>
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                                <h5 className="text-uppercase font-weight-bold"> {currentTransaction.receiver?.user_phone_number}</h5>
                                <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                                <p className="pt-0 text-uppercase font-weight-bold">{currentTransaction.receiver?.user_email}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.receiver?.provider_name}</p>
                            </div>
                        </div>


                        <div className="card px-2 py-2 mb-3">
                            <div className="row px-10 px-2 py-2">

                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Status</p>
                                    <h5 className="text-uppercase font-weight-bold"> {currentTransaction?.movement_type}</h5>
                                </div>
                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Amount</p>
                                    <h5 className="text-uppercase font-weight-bold">{currentTransaction?.balance} {currentTransaction?.currency} </h5>

                                </div>
                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Date </p>
                                    <h5 className="text-uppercase font-weight-bold">{ moment(currentTransaction?.created_at).format("DD-MMM-YYYY HH:mm:ss")}</h5>
                                </div>
                                <div />
                            </div>
                        </div>
                    </div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
 
    function opendetail(data: any) {
        getCurrentTransaction(data);
        handleShow();
    }


    const tabItem = (res:any, type:string='Transfert') => {
        if ('Transfert' === type )
            return <tr key={res.id}>
            <td> <img src={ApiService.imageUrl + res.receiver.user_avatar} className="user__avatar" alt="avatar" /> {res.receiver.user_name} <span className="span__contry">{res.receiver.country.name} ➚ </span> </td>
            <td><img src={ApiService.imageUrl + res.sender.user_avatar} className="user__avatar" alt="avatar" /> {res.sender.user_name} <span className="span__contry">➘ {res.sender.country.name}</span></td>
            <td>{res.reason}</td>
            <td>{moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")} </td>
            <td>{res.balance}</td>
            <td>{res.currency}</td>
            <td>{res.movement_type}</td>
            <td style={{ textAlign: "center" }} className="more__td" onClick={(e) => opendetail(res)}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </td>
        </tr>
        else
            return <tr key={res.id}>
            <td> <img src={ApiService.imageUrl + res.receiver.user_avatar} className="user__avatar" alt="avatar" /> {res.receiver.user_name} <span className="span__contry">{res.receiver.country.name} ➚ </span> </td>
            <td><img src={ApiService.imageUrl + res.requester.user_avatar} className="user__avatar" alt="avatar" /> {res.requester.user_name} <span className="span__contry">➘ {res.requester.country.name}</span></td>

            <td>{moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")} </td>
            <td>{`${res.from_amount} ${res.requester.country.currency}`}</td>
            <td>{`${res.to_amount} ${res.receiver.country.currency}`}</td>
            <td>{res.applied_rate}</td>
            <td>{res.status}</td>
            <td style={{ textAlign: "center" }} className="more__td" onClick={(e) => opendetail(res)}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </td>
        </tr>
    }

    const proxyData = (data:any): any => (data.sender) ? data.sender : data.requester

    function formatDataToCsv(data: any) {
        let custom: any = [];

        data.forEach((rest: any) => {
            custom.push({
                'Sender name': proxyData(rest).user_name,
                'Sender country': proxyData(rest).country.name,
                'Sender code': proxyData(rest).user_code,
                'Sender phone number': proxyData(rest).user_phone_number,
                'Receiver name': rest.receiver.user_name,
                'Receiver country': rest.receiver.country.name,
                'Receiver code': rest.receiver.user_code,
                'Receiver phone number': proxyData(rest).user_phone_number,
                'Amount': rest.balance,
                'Currency': rest.currency,
                'Opperation Data': rest.created_at,
                'Status': rest.status,
            });

            getCSVData(custom);
        });
    }


    return (
        <div>
            <p className="header__title pb-2">All Transactions</p>
            {getModalDetail()}

            <div className="row filter__header">
                <div className="col-md-8">
                    <div className="form-row">
                        <div className="form-check form-group mr-5 ml-2">
                            <input className="form-check-input" type="radio" onChange={() => getAllTransferFc()} name="exampleRadios" id="exampleRadios2" value="option2" checked={activeItem === 'Transfer'} />
                            <label className="form-check-label" >
                                Transaction list
                               </label>
                        </div>

                        <div className="form-check form-group">
                            <input className="form-check-input" onChange={() => getAllRequestFc()} type="radio" name="exampleRadios" id="exampleRadios2" value="option1" checked={activeItem === 'Request'} />
                            <label className="form-check-label" >
                                Request list
                               </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <div className="row">
                        <div className="form-group col-md-4">
                            <select id="inputState" value={status} className="form-control"
                                onChange={(evt) => updateStatus(evt.target.value)} >
                                <option value="All">All</option>

                                {
                                    movement.map(e => <option key={e.id} value={e.label}>{e.label}</option>)
                                }

                            </select>
                        </div>
                        <div className="col-md-4">
                            <CSVLink filename="cvs-SeRemo.csv" data={csvData}> <button className="btn btn-primary">Export CSV</button></CSVLink>
                        </div>
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
                        <th>Sender</th>
                        <th>Reciever</th>
                        {activeItem === 'Transfer' ? (<th>Reason of Request</th>) : null}
                        <th>Date of Operation </th>

                        {activeItem === 'Transfer' ? <><th>amount</th>
                        <th>currency</th>
                        <th >status</th></>:
                        <>
                            <th>From amout</th>
                            <th>To amount</th>
                            <th >Rate</th>
                            <th >Status</th>
                        </>
                        }
                        
                        <th>More</th>
                    </tr>
                    {   (isLoad) ? <></> :
                        (activeItem === 'Transfer') ?
                            transferData.map((res) => tabItem(res)) :
                            transferData.map((res) => tabItem(res, 'Request'))
                    }

                </tbody>

            </table>

            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                  </ul>
                </nav>
            </div>
        </div>
    )
}

export default TrasactionPage;