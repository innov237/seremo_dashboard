import axios from 'axios';
import React, { useState, useEffect, } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
// import { history } from "../../config/history";
import { useHistory } from 'react-router-dom';
import ApiService from '../../services/ApiService';

import moment from 'moment'

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


let code: String | null = null;


const DetailTrasactionPage: React.FC = () => {

    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [currenUserId, setcurrenUserId] = useState('');
    const [userData, setUserData] = useState<any>([]);
    const [activeItem, setActiveItem] = useState('Transfer');
    const [csvData, getCSVData] = useState<any[]>([]);
    const [status, setStatus] = useState('All');
    const [movement, setMovement] = useState<any[]>([]);   
      
    const history = useHistory();

    useEffect(() => {
        
        if (history.location.state != null) {
            setUserData([history.location.state]);
            let stateData: any = history.location.state;
            
            search({target:{value:stateData.attributes.user_code}})
        }
        getAllMovement()
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
        const url =  (param == null) ? `v1/transactions?user=${code}` : `v1/transactions?user=${code}&type=${param}`;

        setActiveItem('Transfer');

        var response = await ApiService.getData(url);

        getAllTransfer(response.data);
        formatDataToCsv(response.data);
        setLoader(false);
    };

    const getAllRequestFc = async (param:any | null = null) => {
        setLoader(true);
        getAllTransfer([]);
        setActiveItem('Request');
        setMovement(statusRequest)
        const url =  (param == null) ? `v1/requests?user=${code}` : `v1/requests?user=${code}&type=${param}`;
        var response = await ApiService.getData(url);

        getAllTransfer(response.data);
        formatDataToCsv(response.data);
        setLoader(false);
    };

   
   
    /*const getAllTransferFc = async (user_id: any) => {
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
    }; */

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        if (res.length) {
            
            setUserData(res);
            code = res[0].user_code;
            setcurrenUserId(res[0].user_code);
            getAllTransferFc();
            setLoader(false);
        } else {
            setLoader(false);
        }
    } 

    const tabItem = (res:any, type:string='Transfert') => {
        
        
        if ('Transfert' === type )
            return <tr key={res.id}>
            <td><img src={res.receiver.user_avatar} className="user__avatar" alt="avatar" /> {res.receiver.user_name}<span className="span__contry">{res.receiver.country.name} ➚ </span> <img src={res.receiver.country.flag} className="user__avatar" alt="avatar" /></td>
            <td><img src={res.sender.user_avatar} className="user__avatar" alt="avatar" /> {res.sender.user_name} <span className="span__contry">➘ {res.sender.country.name}</span> <img src={res.sender.country.flag} className="user__avatar" alt="avatar" /></td>
            <td>{res.reason}</td>
            <td>{moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")} </td>
            <td>{res.balance}</td>
            <td>{res.currency}</td>
            <td>{res.movement_type}</td>
            <td style={{ textAlign: "center" }} className="more__td" >
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </td>
        </tr>
        else
            return <tr key={res.id}>
            <td> <img src={res.receiver.user_avatar} className="user__avatar" alt="avatar" /> {res.receiver.user_name} <span className="span__contry">{res.receiver.country.name} ➚ </span> <img src={res.receiver.country.flag} className="user__avatar" alt="avatar" /></td>
            <td><img src={res.requester.user_avatar} className="user__avatar" alt="avatar" /> {res.requester.user_name} <span className="span__contry">➘ {res.requester.country.name}</span><img src={res.requester.country.flag} className="user__avatar" alt="avatar" /></td>

            <td>{moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")} </td>
            <td>{`${res.from_amount} ${res.requester.country.currency}`}</td>
            <td>{`${res.to_amount} ${res.receiver.country.currency}`}</td>
            <td>{res.applied_rate}</td>
            <td>{res.status}</td>
            <td style={{ textAlign: "center" }} className="more__td">
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
    //console.log(userData)
    const userDataToMap: any = 
        (userData.length && userData[0].attributes) ? userData[0].attributes : userData[0]
    

    
    

    return (
        <div>
            <p className="header__title">Search User</p>
            <div className="row filter__header">
                <div className="col-md-4">
                </div>
                <div className="col-md-8 d-flex justify-content-end">
                    <div className="row">
                        <div className="col-md-5">
                            <input type="text" id="" placeholder="Search By code" className="form-control" onBlur={(e) => { search(e)}} />
                        </div>
                        <div className="col-md-4">
                            <select id="inputState" value={status} className="form-control"
                                onChange={(evt) => updateStatus(evt.target.value)} >
                                <option value="All">All</option>

                                {
                                    movement.map(e => <option key={e.id} value={e.label}>{e.label}</option>)
                                }

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
                            <img src={userDataToMap.user_avatar} style={{ height: "150px", width: "150px" }} />
                        </div>

                        <div className="col-4  mt-2">
                            <p className="p-0 m-0 text-primary"><i className="fa fa-sort-numeric-down-alt text-primary"></i> User Code</p>
                            <p className="text-uppercase font-weight-bold"> {userDataToMap.user_code}</p>
                            <p className="p-0 m-0 text-primary"><i className="fa fa-user text-primary" ></i> Name </p>
                            <p className="text-uppercase font-weight-bold">{userDataToMap.user_name} {userDataToMap.user_last_name}</p>
                            <p className="p-0 m-0 text-primary"><i className="fa fa-globe-asia text-primary"></i> Country</p>
                            <p className="text-uppercase font-weight-bold">{userDataToMap.country.name}</p>
                        </div>

                        <div className="col-4  mt-2">
                            <p className="p-0 m-0 text-primary"><i className="fa fa-phone text-primary"></i> Phone number</p>
                            <h5 className="text-uppercase font-weight-bold"> {userDataToMap.user_phone_number}</h5>
                            <p className="pt-1 m-0 text-primary"><i className="fa fa-envelope-square text-primary"></i> Email</p>
                            <p className="pt-0 text-uppercase font-weight-bold">{userDataToMap.user_email}</p>
                            <p className="p-0 m-0 text-primary"><i className="fa fa-wifi text-primary"></i> Provider </p>
                            <p className="text-uppercase font-weight-bold">{userDataToMap.provider_name}</p>
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
        </div>
    )
}

export default DetailTrasactionPage;