import axios from 'axios';
import { pid } from 'process';
import React, { useState, useEffect } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
// import { history } from "../../config/history";
import { useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const TrasactionPage: React.FC = () => {

    const history = useHistory();

    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const [activeItem, setActiveItem] = useState('Transfer');
    const [csvData, getCSVData] = useState<any[]>([]);

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

    function search(value: any) {
        alert(value);
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
            <div className="row filter__header">
                <div className="col-md-8">
                    <div className="form-row">
                        <div className="form-check form-group mr-5 ml-2">
                            <input className="form-check-input" type="radio" onClick={getAllTransferFc} name="exampleRadios" id="exampleRadios2" value="option2" checked={activeItem === 'Transfer'} onChange={e => { }} />
                            <label className="form-check-label" >
                                Transfer list
                               </label>
                        </div>

                        <div className="form-check form-group">
                            <input className="form-check-input" onClick={getAllRequestFc} type="radio" name="exampleRadios" id="exampleRadios2" value="option2" checked={activeItem === 'Request'} onChange={e => { }} />
                            <label className="form-check-label" >
                                Request list
                               </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <div className="row">
                        <div className="col-md-8">
                            <select id="inputState" value={'status'} defaultValue={'status'} className="form-control"
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
                    return (<tr onClick={(e) => detailUser(res?.sender_id)}>
                        <td> <img src={imageUrl + res.senderData.user_avatar} className="user__avatar" alt="avatar" /> {res.senderData.user_name} <span className="span__contry">{res.senderData.country_name} ➚ </span> </td>
                        <td><img src={imageUrl + res.recieverData.user_avatar} className="user__avatar" alt="avatar" /> {res.recieverData.user_name} <span className="span__contry">➘ {res.recieverData.country_name}</span></td>
                        {activeItem === 'Request' ? (<td>{res.reason}</td>) : null}
                        <td>{res.created_at}</td>
                        <td>{res.amount}</td>
                        <td>{res.currency}</td>
                        <td>{res.status}</td>
                        <td style={{ textAlign: "center" }} className="more__td">
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