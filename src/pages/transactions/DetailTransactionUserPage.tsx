import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CSVLink, CSVDownload } from "react-csv";

const DetailTrasactionPage: React.FC = () => {

    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const [activeItem, setActiveItem] = useState('Transfer');
    const [csvData, getCSVData] = useState<any[]>([]);

    const imageUrl = "https://seremoworld.com/seremoapi/public/storage/";

    useEffect(() => {
        getAllTransferFc();

    }, [])


    const getAllTransferFc = () => {
         let userId = sessionStorage.getItem(JSON.stringify('userId'));
        setActiveItem('Transfer');
        setLoader(true);
        axios.get("https://seremoworld.com/seremoapi/public/api/dashboard/transfer/getUserTransfer/" + userId).then(response => {
            getAllTransfer(response.data);
            formatDataToCsv(response.data);
            setLoader(false);
        }).catch(err => {
            setLoader(false);
            console.log(err);
        });
    };

    const getAllRequestFc = () => {
        let userId = sessionStorage.getItem(JSON.stringify('userId'));
        setActiveItem('Request');
        setLoader(true);
        axios.get("https://seremoworld.com/seremoapi/public/api/dashboard/transfer/getUserRequest/" + userId).then(response => {
            getAllTransfer(response.data);
            formatDataToCsv(response.data);
            setLoader(false);
        }).catch(err => {
            setLoader(false);
            console.log(err);
        });
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
            <div className="row filter__header">
                <div className="col-md-8">
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
            <div className="px-2 py-2">
                <div className="row px-10 border border-primary rounded px-2 py-2 justify-content-between">
                    <div className=" mr-5 ml-2 border border-primary mt-3 bg-primary" style={{ height: "150px", width: "150px" }}>
                    </div>

                    <div className="form-group  mt-2">
                        <p className="p-0 m-0 text-primary">Client Code</p>
                        <h5 className="text-uppercase font-weight-bold">{transferData[0]?.code}</h5>
                        <p className="p-0 m-0 text-primary">Nom et Prénom</p>
                        <h5 className="text-uppercase font-weight-bold">{transferData[0]?.nom + ' ' + transferData[0]?.prenom}</h5>
                        <p className="p-0 m-0 text-primary">Date de naissance</p>
                        <h5 className="text-uppercase font-weight-bold">{transferData[0]?.date_naissance}</h5>
                    </div>

                    <div className="form-group  mt-2">
                        <p className="p-0 m-0 text-primary">Client Code</p>
                        <h5 className="text-uppercase font-weight-bold">{transferData[0]?.code}</h5>
                        <p className="p-0 m-0 text-primary">Nom et Prénom</p>
                        <h5 className="text-uppercase font-weight-bold">{transferData[0]?.nom + ' ' + transferData[0]?.prenom}</h5>
                        <p className="p-0 m-0 text-primary">Date de naissance</p>
                        <h5 className="text-uppercase font-weight-bold">{transferData[0]?.date_naissance}</h5>
                    </div>
                </div>
            </div>
           
            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}

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

            <table className="table">
                <tr className="theader">
                    {/* <th>Sender</th> */}
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
                        {/* <td> <img src={imageUrl + res.senderData.user_avatar} className="user__avatar" alt="avatar" /> {res.senderData.user_name} <span className="span__contry">{res.senderData.user_country} ➚ </span> </td> */}
                        <td><img src={imageUrl + res.recieverData?.user_avatar} className="user__avatar" alt="avatar" /> {res.recieverData?.user_name} <span className="span__contry">➘ {res.recieverData?.user_country}</span></td>
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

export default DetailTrasactionPage;