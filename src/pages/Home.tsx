
import './Home.css';
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import {
    Switch,
    Route,
    Link,
} from "react-router-dom";

import {
    useDispatch, useSelector
} from 'react-redux'

import {
    BEFORE_ACTION_LOGOUT,
    ACTION_LOGOUT
} from '../redux/Auth/Actions'

import TrasactionPage from './transactions/TransactionsPage';
import HistoryPage from './transactions/HistoryPage';
import RemovePage from './transactions/RemovePage';
import AdministrationsPage from './administrations/AdministrationsPage';
import AccessLogPage from './accessLogPage/AccessLogPage';
import DetailTransactionUserPage from './transactions/DetailTransactionUserPage';
import ApiService from '../services/ApiService';
import UsersListPage from './users/UsersListPage';
import DashBoardPage from './dashboard/DashboardPage';
import { useLocation } from 'react-router-dom';



const HomePage: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [transferData, getAllTransfer] = useState<any[]>([]);
    const [isLoad, setLoader] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const [activeItem, setActiveItem] = useState('Transfer');
    const [csvData, getCSVData] = useState<any[]>([]);

    const auth  = useSelector((state: any) => state.auth);

    ApiService.putToken(auth.token)
    
   
    const logOut = async () => {
         var datalog = {
            "id": auth.user.id,
            "status": "out"
        }
        
        var response = await ApiService.postData("dashboard/createAccessLog", datalog);

    }


    async function logOutApi() {
        logOut()
        var res = await ApiService.getData("v1/logout");
        if (res.success)
            dispatch(ACTION_LOGOUT())
    }

    const logout = async () => {

        if (window.confirm("Do you want to log out ?")) {
            await localStorage.clear();
            history.push('/login');
        }

    }

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


    async function search(value: any) {
        setLoader(true);
        var res = await ApiService.getData("dashboard/getTransferByCode/" + value);
        if (res.length) {
            getAllTransfer(res);
            history.push("/admin/transactions", res);
        } else

            alert("No transfert found with code:" + value);


        setLoader(false);
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
                    <li className={location.pathname == '/admin/dashboard' ? "active" : ""}><i className="fa fa-tachometer-alt"></i> <Link to="/admin/dashboard">Dashboard</Link></li>
                    <li className={location.pathname == '/admin/transactions' ? "active" : ""}><i className="fa fa-exchange-alt"></i> <Link to="/admin/transactions">Transactions</Link></li>
                    <li className={location.pathname == '/admin/administrations' ? "active" : ""}><i className="fa fa-users-cog"></i> <Link to="/admin/administrations">Administrations</Link></li>
                    <li className={location.pathname == '/admin/access-log' ? "active" : ""}><i className="fa fa-list"></i> <Link to="/admin/access-log">Access log</Link></li>
                    <li className={location.pathname == '/admin/detailtransactionUser' ? "active" : ""}><i className="fa fa-search"></i> <Link to="/admin/detailtransactionUser">Search User</Link></li>
                    <li className={location.pathname == '/admin/all-users' ? "active" : ""}><i className="fa fa-users"></i> <Link to="/admin/all-users">All Users</Link></li>
                    <li className={location.pathname == '/admin/retrait' ? "active" : ""}><i className="fa fa-money-check"></i> <Link to="/admin/retrait">Withdrawal request
</Link></li>
                    <li className={location.pathname == '/admin/history' ? "active" : ""}><i className="fa fa-history"></i> <Link to="/admin/history">Historical</Link></li>
                    <li onClick={logOutApi} className={location.pathname == '/login' ? "mt-5 active" : "mt-5 text-white"}><i className="fa fa-sign-out-alt"></i> Log out</li>
                </div>
                <div className="col-md-10 main__row">
                    <Switch>
                        <Route path="/admin/transactions">
                            <TrasactionPage />
                        </Route>
                        <Route path="/admin/administrations" component={AdministrationsPage} ></Route>
                        <Route path="/admin/access-log" component={AccessLogPage}></Route>
                        <Route path="/admin/detailtransactionUser" component={DetailTransactionUserPage}></Route>
                        <Route path="/admin/all-users" component={UsersListPage} />
                        <Route path="/admin/dashboard" component={DashBoardPage} />
                        <Route path="/admin/retrait" component={RemovePage} />
                        <Route path="/admin/history" component={HistoryPage} />
                        <Route path="/admin/" component={DashBoardPage} />
                        <Route exact path="/admin">
                            <Redirect to="/admin/dashboard"></Redirect>
                        </Route>
                    </Switch>
                </div>
            </div >
        </div >
    )
}

export default HomePage;
