import axios from 'axios';
import { pid } from 'process';
import React, { useState, useEffect } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
// import { history } from "../../config/history";
import { useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import ApiService from '../../services/ApiService';
import { resolveAny } from 'dns';


const TrasactionPage: React.FC = () => {

    const history = useHistory();

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
        console.log(response);
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
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {(currentTransaction !== null) && <div className="">
                        <div className="card px-2 py-2 mb-3">
                            <div className="row px-10 px-2 py-2">
                                <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                    <img src={imageUrl + currentTransaction?.senderData.user_avatar} style={{ height: "140px", width: "140px" }} className="user__avatar" alt="avatar" />
                                </div>

                                <div className="col-4  mt-2">
                                    <p className="p-0 m-0 text-primary">User</p>
                                    <h5 className="text-uppercase font-weight-bold">Sender</h5>
                                    <p className="p-0 m-0 text-primary">Name </p>
                                    <h5 className="text-uppercase font-weight-bold">{currentTransaction?.senderData?.user_name} {currentTransaction.senderData?.['user_last_name']}</h5>

                                </div>

                                <div className="col-4  mt-2">
                                    <p className="p-0 m-0 text-primary">Country Code</p>
                                    <h5 className="text-uppercase font-weight-bold"> {currentTransaction?.senderData?.country_code}</h5>
                                    <p className="p-0 m-0 text-primary">Country</p>
                                    <h5 className="text-uppercase font-weight-bold">{currentTransaction?.senderData?.country_name}</h5>

                                </div>
                                <div />
                            </div>
                        </div>

                        <div className="card px-2 py-2 mb-3">
                            <div className="row px-10 px-2 py-2">
                                <div className="col-4" style={{ height: "150px", width: "150px" }}>
                                    <img src={imageUrl + currentTransaction.recieverData.user_avatar} style={{ height: "140px", width: "140px" }} className="user__avatar" alt="avatar" />
                                </div>

                                <div className="col-4  mt-2">
                                    <p className="p-0 m-0 text-primary">User</p>
                                    <h5 className="text-uppercase font-weight-bold">Reciever</h5>
                                    <p className="p-0 m-0 text-primary">Name </p>
                                    <h5 className="text-uppercase font-weight-bold">{currentTransaction?.recieverData?.user_name} {currentTransaction.recieverData?.['user_last_name']}</h5>
                                </div>


                                <div className="col-4  mt-2">
                                    <p className="p-0 m-0 text-primary">Country code</p>
                                    <h5 className="text-uppercase font-weight-bold"> {currentTransaction?.recieverData?.country_code}</h5>
                                    <p className="p-0 m-0 text-primary">Country</p>
                                    <h5 className="text-uppercase font-weight-bold">{currentTransaction?.recieverData?.country_name}</h5>

                                </div>
                                <div />
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
                                    <h5 className="text-uppercase font-weight-bold">{currentTransaction?.created_at}</h5>
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


    function detailUser(id: any) {
        history.push("/admin/detailtransactionUser", id);
    }

    return (
        <div>
            <p className="header__title pb-2">All Transactions</p>
            
            {getModalDetail()}

            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}


            <table className="table">
                <tr className="theader">
                    <th>Sender</th>
                    <th>Reciever</th>
                    {activeItem === 'Request' ? (<th>Reason of Request</th>) : null}
                    <th>Date of Operation </th>
                    <th>amount</th>
                    <th>Currency</th>
                    <th >status</th>
                    <th>More</th>
                </tr>
                {transferData.map((res) => {
                    return (<tr>
                        <td> <img src={imageUrl + res.senderData.user_avatar} className="user__avatar" alt="avatar" /> {res.senderData.user_name} <span className="span__contry">{res.senderData.country_name} ➚ </span> </td>
                        <td><img src={imageUrl + res.recieverData.user_avatar} className="user__avatar" alt="avatar" /> {res.recieverData.user_name} <span className="span__contry">➘ {res.recieverData.country_name}</span></td>
                        {activeItem === 'Request' ? (<td>{res.reason}</td>) : null}
                        <td>{res.created_at}</td>
                        <td>{res.amount}</td>
                        <td>{res.currency}</td>
                        <td>{res.status}</td>
                        <td style={{ textAlign: "center" }} className="more__td" onClick={(e) => opendetail(res)}>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </td>
                    </tr>)
                })}
            </table>
        </div>
    )
}

export default TrasactionPage;