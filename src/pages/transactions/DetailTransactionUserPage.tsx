import axios from 'axios';
import React, { useState, useEffect, } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
// import { history } from "../../config/history";
import { useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';


const DetailTrasactionPage: React.FC = () => {

    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [currenUserId, setcurrenUserId] = useState('');
    const [userData, setUserData] = useState<any>([]);
    const [activeItem, setActiveItem] = useState('Transfer');
    const [csvData, getCSVData] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        if (history.location.state != null) {
            console.log(history.location.state);
            setUserData([history.location.state]);
            let stateData: any = history.location.state;
            setcurrenUserId(stateData.id);
            getAllTransferFc(stateData.id);
        }
    }, [])

    const getAllTransferFc = async (user_id: any) => {
        setActiveItem('Transfer');
        setLoader(true);
        var response = await ApiService.getData("transfer/getUserTransfer/" + user_id);
        console.log(response);
        if (response !== null) {

            getAllTransfer(response);
            console.log(response);
            // formatDataToCsv(response);
            setLoader(false);
        } else {
            setLoader(false);
        }
    };

    const getAllRequestFc = async (user_id: any) => {
        setActiveItem('Request');
        setLoader(true);
        var response = await ApiService.getData("request/getUserRequest/" + user_id);
        if (response !== null) {
            getAllTransfer(response);
            // formatDataToCsv(response.data);
            setLoader(false);
        } else {
            setLoader(false);
        }
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
        var res = await ApiService.getData("user/getUserByCode?key=" + value.target.value);
        console.log(res);
        if (res !== null) {
            setUserData(res);
            console.log(res[0].user_id);
            setcurrenUserId(res[0].user_id);
            getAllTransferFc(res[0].user_id);
            setLoader(false);
        } else {
            setLoader(false);
        }
    }


    function formatDataToCsv(data: any) {
        let custom: any = [];
        data.forEach((rest: any) => {
            custom.push({
                'Sender name': rest.senderData.user_name,
                'Sender country': rest.senderData.user_country,
                'Sender code': rest.senderData.user_code,
                'Sender phone number': rest.senderData.user_phoneNumber,
                'Receiver name': rest.recieverData.user_name,
                'Receiver country': rest.recieverData.user_country,
                'Receiver code': rest.recieverData.user_code,
                'Receiver phone number': rest.senderData.user_phoneNumber,
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
            <p className="header__title">Search User</p>
            <div className="row filter__header">
                <div className="col-md-4">
                </div>
                <div className="col-md-8 d-flex justify-content-end">
                    <div className="row">
                        <div className="col-md-5">
                            <input type="text" id="" placeholder="Search By code" className="form-control" onBlur={(e) => search(e)} />
                        </div>
                        <div className="col-md-4">
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
                        <div className="col-md-3">
                            <CSVLink filename="cvs-SeRemo.csv" data={csvData}> <button className="btn btn-primary">Export CSV</button></CSVLink>
                        </div>
                    </div>
                </div>
            </div>
            {
                (userData.length > 0) && <div className="card shadow-sm px-2 mt-2 py-2 mb-3">
                    <div className="row px-10 px-2 py-2">
                        <div className="col-4" style={{ height: "150px", width: "150px" }}>
                            <img src={ApiService.imageUrl + userData[0]?.user_avatar} style={{ height: "150px", width: "150px" }} />
                        </div>

                        <div className="col-4  mt-2">
                            <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                            <p className="text-uppercase font-weight-bold"> {userData[0]?.user_code}</p>
                            <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                            <p className="text-uppercase font-weight-bold">{userData[0]?.user_name} {userData[0]?.['user_last_name']}</p>
                            <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                            <p className="text-uppercase font-weight-bold">{userData[0]?.country_name}</p>
                        </div>

                        <div className="col-4  mt-2">
                            <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                            <h5 className="text-uppercase font-weight-bold"> {userData[0]?.user_phone_number}</h5>
                            <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                            <p className="pt-0 text-uppercase font-weight-bold">{userData[0]?.user_email}</p>
                            <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                            <p className="text-uppercase font-weight-bold">{userData[0]?.provider_name}</p>
                        </div>
                    </div>
                </div>
            }

            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}

            <div className="col-md-8">
                <div className="form-row">
                    <div className="form-check form-group mr-5 ml-2">
                        <input className="form-check-input" type="radio" onClick={() => getAllTransferFc(currenUserId)} name="exampleRadios" id="exampleRadios2" value="option2" checked={activeItem === 'Transfer'} />
                        <label className="form-check-label" >
                            Transfer list
                               </label>
                    </div>

                    <div className="form-check form-group">
                        <input className="form-check-input" onClick={() => getAllRequestFc(currenUserId)} type="radio" name="exampleRadios" id="exampleRadios2" value="option2" checked={activeItem === 'Request'} />
                        <label className="form-check-label" >
                            Request list
                               </label>
                    </div>
                </div>
            </div>

            <table className="table">
                <tr className="theader">
                    <th>Reciever</th>
                    {activeItem === 'Request' ? (<th>Reason of Request</th>) : null}
                    <th>Date of Operation </th>
                    <th>amount</th>
                    <th>Rate</th>
                    <th>status</th>
                    <th>More</th>
                </tr>
                {transferData.length > 0 && transferData.map((res) => {
                    return (<tr>
                        <td><img src={ApiService.imageUrl + res.userData.user_avatar} className="user__avatar" alt="avatar" /> {res.userData?.user_name} <span className="span__contry">➘ {res.userData?.user_country}</span></td>
                        {activeItem === 'Request' ? (<td>{res.reason}</td>) : null}
                        <td>{res.created_at}</td>
                        <td>{res.amount}</td>
                        <td>{res.rate}</td>
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

export default DetailTrasactionPage;