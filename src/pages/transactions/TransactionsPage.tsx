
import React, { useState, useEffect } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
// import { history } from "../../config/history";
import { useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import ApiService from '../../services/ApiService';


import moment from 'moment';


const TrasactionPage: React.FC = () => {

    const history = useHistory();

    const [selectOptionValue, setSelectOptionValue] = useState('status')
    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [currentTransaction, getCurrentTransaction] = useState<any>(null);
    const [activeItem, setActiveItem] = useState('Transfer');
    const [csvData, getCSVData] = useState<any[]>([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const imageUrl = "https://seremoworld.com/seremoapi/public/storage/";

    useEffect(() => {
        getAllTransferFc();
    }, [])



    const getAllTransferFc = async () => {

        
        setActiveItem('Transfer');
        setLoader(true); 
        var response = await ApiService.getData("dashboard/getAllTransfer");
        //console.log(response);
        getAllTransfer(response);
        formatDataToCsv(response);
        setLoader(false);
    };


    const getAllRequestFc = async () => {
        setActiveItem('Request');
        setLoader(true);
        var response = await ApiService.getData("dashboard/getAllRequest");
        getAllTransfer(response);
        formatDataToCsv(response);
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
        setLoader(true);
        var res = await ApiService.getData("dashboard/getTransferByCode/" + value);
        console.log(res);
        getAllTransfer(res);
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
                                <img src={ApiService.imageUrl + currentTransaction.senderData?.user_avatar} style={{ height: "150px", width: "150px" }} />
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                                <p className="text-uppercase font-weight-bold"> {currentTransaction.senderData?.user_code}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.senderData?.user_name} {currentTransaction.senderData?.['user_last_name']}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.senderData?.country_name}</p>
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                                <h5 className="text-uppercase font-weight-bold"> {currentTransaction.senderData?.user_phone_number}</h5>
                                <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                                <p className="pt-0 text-uppercase font-weight-bold">{currentTransaction.senderData?.user_email}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.senderData?.provider_name}</p>
                            </div>
                        </div>
                        <hr />
                        <h4>Reciever</h4>
                        <div className="row px-10 px-2 py-2">
                            <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                <img src={ApiService.imageUrl + currentTransaction.recieverData?.user_avatar} style={{ height: "150px", width: "150px" }} />
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                                <p className="text-uppercase font-weight-bold"> {currentTransaction.recieverData?.user_code}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.recieverData?.user_name} {currentTransaction.recieverData?.['user_last_name']}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.senderData?.country_name}</p>
                            </div>

                            <div className="col-4  mt-2">
                                <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                                <h5 className="text-uppercase font-weight-bold"> {currentTransaction.recieverData?.user_phone_number}</h5>
                                <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                                <p className="pt-0 text-uppercase font-weight-bold">{currentTransaction.recieverData?.user_email}</p>
                                <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                                <p className="text-uppercase font-weight-bold">{currentTransaction.recieverData?.provider_name}</p>
                            </div>
                        </div>


                        <div className="card px-2 py-2 mb-3">
                            <div className="row px-10 px-2 py-2">

                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Status</p>
                                    <h5 className="text-uppercase font-weight-bold"> {currentTransaction?.status}</h5>
                                </div>
                                <div className="col-6  mt-2">
                                    <p className="p-0 m-0 text-primary">Amount</p>
                                    <h5 className="text-uppercase font-weight-bold">{currentTransaction?.amount} {currentTransaction?.currency} </h5>

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


    function formatDataToCsv(data: any) {
        let custom: any = [];
        data.forEach((rest: any) => {
            custom.push({
                'Sender name': rest.senderData.user_name,
                'Sender country': rest.senderData.country_name,
                'Sender code': rest.senderData.user_code,
                'Sender phone number': rest.senderData.user_phone_number,
                'Receiver name': rest.recieverData.user_name,
                'Receiver country': rest.recieverData.country_name,
                'Receiver code': rest.recieverData.user_code,
                'Receiver phone number': rest.senderData.user_phone_number,
                'Amount': rest.amount,
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
                            <input className="form-check-input" type="radio" onClick={getAllTransferFc} name="exampleRadios" id="exampleRadios2" value="option2" checked={activeItem === 'Transfer'} />
                            <label className="form-check-label" >
                                Transfer list
                               </label>
                        </div>

                        <div className="form-check form-group">
                            <input className="form-check-input" onClick={getAllRequestFc} type="radio" name="exampleRadios" id="exampleRadios2" value="option2" checked={activeItem === 'Request'} />
                            <label className="form-check-label" >
                                Request list
                               </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <div className="row">
                        <div className="form-group col-md-4">
                            <select id="inputState" value='status' className="form-control"
                                onChange={(evt) => filterByStatus(evt.target.value)} >
                                <option selected value="status">{activeItem} Status</option>
                                <option value="successful">Successful</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                                <option value="cancel">Cancel</option>
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
                        {activeItem === 'Request' ? (<th>Reason of Request</th>) : null}
                        <th>Date of Operation </th>
                        <th>amount</th>
                        <th>Rate</th>
                        <th >status</th>
                        <th>More</th>
                    </tr>
                    {transferData.map((res) => {
                        return (<tr key={res.id}>
                            <td> <img src={imageUrl + res.senderData.user_avatar} className="user__avatar" alt="avatar" /> {res.senderData.user_name} <span className="span__contry">{res.senderData.country_name} ➚ </span> </td>
                            <td><img src={imageUrl + res.recieverData.user_avatar} className="user__avatar" alt="avatar" /> {res.recieverData.user_name} <span className="span__contry">➘ {res.recieverData.country_name}</span></td>
                            {activeItem === 'Request' ? (<td>{res.reason}</td>) : null}
                            <td>{moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")} </td>
                            <td>{res.amount}</td>
                            <td>{res.rate}</td>
                            <td>{res.status}</td>
                            <td style={{ textAlign: "center" }} className="more__td" onClick={(e) => opendetail(res)}>
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </td>
                        </tr>)
                    })} 
                </tbody>
                
            </table>
        </div>
    )
}

export default TrasactionPage;