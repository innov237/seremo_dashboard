import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";

import moment from 'moment';

import ApiService from '../../services/ApiService';

const AccessLogPage: React.FC = () => {

    const [isLoad, setLoader] = useState(false);
    // const [csvData, getCSVData] = useState<any[]>([]);
    const [userData, getData] = useState<any[]>([]);
    const [next, setNext] = useState<string>('');
    const [prev, setPrev] = useState<string>('');

    useEffect(() => {
        getAllLog();
    }, [])

    const substringURL = (url:string) => {
        const rootURL = `${process.env.REACT_APP_API_URL}/api`
        return url.substring(rootURL.length, url.length);
    }

    const getAllLog = async(data: string= '') => {
        setLoader(true);

        let url = "dashboard/getAdminAccessLog"
        if (data != '')
            url = substringURL(data)

        console.log(url)
        var response = await ApiService.getData(url);
        setNext(response.next_page_url);
        setPrev(response.prev_page_url)
        getData(response.data)
        setLoader(false)
    };

    const up = () => `page-item ${(next) ? '' : 'disabled'}`;
    const down = () => `page-item ${(prev) ? '' : 'disabled'}`;

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
                            <td>{res.admin.name}</td>
                            <td>{res.admin.email}</td>
                            <td>{res.admin.roles[0].name}</td>
                            <td>{res.status}</td>
                            <td>{moment(res.created_at).format("DD-MMM-YYYY HH:mm:ss")}</td>
                           
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
             <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={down()} onClick={ () => getAllLog(prev)} ><a className="page-link" >Previous</a></li>
                    
                    <li className={up()} onClick={ () => getAllLog(next)}><a className="page-link" >Next</a></li>
                  </ul>
                </nav>
            </div>
        </div>
    )
}

export default AccessLogPage;