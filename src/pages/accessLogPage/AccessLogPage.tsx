import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";

import moment from 'moment';

import ApiService from '../../services/ApiService';

const AccessLogPage: React.FC = () => {

    const [isLoad, setLoader] = useState(false);
    // const [csvData, getCSVData] = useState<any[]>([]);
    const [userData, getData] = useState<any[]>([]);

    useEffect(() => {
        getAllLog();
    }, [])

    const getAllLog = async() => {
        setLoader(true);

        var response = await ApiService.getData("dashboard/getAdminAccessLog");
        
        getData(response)
        setLoader(false)
    };

    return (
        <div>
            <p className="header__title">Access Log</p>
            <div className="card mt-2">
                <div className="card-header">
                    <h1>User Access</h1>
                </div>
                <table className="table">
                    <tr className="theader">
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Type</th>
                        <th>status</th>
                        <th>Access Date time</th>
                    </tr>
                    <tbody>
                    {userData.map((res,index) => {
                        return (<tr key={index}>
                            <td>{res.name} </td>
                            <td>{res.email}</td>
                            <td>{res.type}</td>
                            <td>{res.status}</td>
                            <td>{moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")}</td>
                           
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AccessLogPage;