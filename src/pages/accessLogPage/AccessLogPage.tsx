import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";

const AccessLogPage: React.FC = () => {

    const [isLoad, setLoader] = useState(false);
    // const [csvData, getCSVData] = useState<any[]>([]);
    const [userData, getData] = useState<any[]>([]);

    useEffect(() => {
        getAllLog();
    }, [])

    const getAllLog = () => {
        setLoader(true);
        axios.get("https://seremoworld.com/seremoapi/public/api/dashboard/getAdminAccessLog").then(response => {
            getData(response.data);
            setLoader(false);
        }).catch(err => {
            setLoader(false);
            console.log(err);
        });
    };

    return (
        <div>
            <div className="card mt-2">
                <div className="card-header">
                    <h1>User Access</h1>
                </div>
                <table className="table">
                    <tr className="theader">
                        <th>User Name</th>
                        <th>User Type</th>
                        <th>status</th>
                        <th>Access Date time</th>
                        <th>More</th>
                    </tr>
                    {userData.map((res) => {
                        return (<tr>
                            <td>{res.name} </td>
                            <td>{res.type}</td>
                            <td>{res.status}</td>
                            <td>{res.created_at}</td>
                            <td style={{ textAlign: "center" }} className="more__td">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </td>
                        </tr>)
                    })}
                </table>
            </div>
        </div>
    )
}

export default AccessLogPage;