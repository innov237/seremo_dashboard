
import './Home.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TrasactionPage from './transactions/TransactionsPage';
import AdministrationsPage from './administrations/AdministrationsPage';
import AccessLogPage from './accessLogPage/AccessLogPage';
import DetailTransactionUserPage from './transactions/DetailTransactionUserPage';
import ApiService from '../services/ApiService';


const HomePage: React.FC = () => {

    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const [activeItem, setActiveItem] = useState('Transfer');
    const [csvData, getCSVData] = useState<any[]>([]);

    const imageUrl = "https://seremoworld.com/seremoapi/public/storage/";

    useEffect(() => {
        getAllTransferFc();
        getAllRequestFc();
    }, [])


    const getAllTransferFc = async () => {
        setActiveItem('Transfer');
        setLoader(true);
        var response = await ApiService.getData("dashboard/getAllTransfer");
        getAllTransfer(response);
        formatDataToCsv(response);
        setLoader(false);
    };

    const getAllRequestFc = async () => {
        setActiveItem('Request');
        setLoader(true);
        setActiveItem('Transfer');
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
        <div className="container-fluid">
            <div className="row pt-2 header_search__bar">
                <div className="col-md-8">
                    <h1 className="mb-5">Seremo</h1>
                    <p style={{ color: "white" }} >Dashboard</p>
                </div>
                <div className="col-md-4  d-flex justify-content-end" style={{ textAlign: "end" }}>
                    <div className="searchInput">
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder={"Search " + activeItem} onChange={event => setsearchValue(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-blue" onClick={() => search(searchValue)}>ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 side__menu">
                    <li><Link to="/admin/transactions">Transactions</Link></li>
                    <li><Link to="/admin/administrations">Administrations</Link></li>
                    <li><Link to="/admin/access-log">Access log</Link></li>
                    <li><Link to="/admin/detailtransactionUser">User search</Link></li>
                </div>
                <div className="col-md-10 main__row">
                    <Switch>
                        <Route path="/admin/transactions">
                            <TrasactionPage />
                        </Route>
                        <Route path="/admin/administrations" component={AdministrationsPage}></Route>
                        <Route path="/admin/access-log" component={AccessLogPage}></Route>
                        <Route path="/admin/detailtransactionUser" component={DetailTransactionUserPage}></Route>
                    </Switch>

                </div>
            </div >
        </div >
    )
}

export default HomePage;
