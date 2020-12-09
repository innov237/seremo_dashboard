import React from 'react';

const AccessLogPage: React.FC = () => {

    var userData = [
        { 'name': 'innov237', 'type': 'super admin', 'datetime': '12/11/2020 12:30:20' },
        { 'name': 'innov237', 'type': 'super admin', 'datetime': '12/11/2020 06:40:08' },
        { 'name': 'cedric djiele', 'type': 'admin', 'datetime': '12/11/2020 08:59:02' },
        { 'name': 'lorent bobo', 'type': 'admin', 'datetime': '12/11/2020 02:08:20' },
        { 'name': 'lorent bobo', 'type': 'admin', 'datetime': '20/11/2020 11:20:56' },
        { 'name': 'sonia', 'type': 'admin', 'datetime': '12/11/2020 12:00:12' },
    ]

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
                        <th>Access Date time</th>
                        <th>More</th>
                    </tr>
                    {userData.map((res) => {
                        return (<tr>
                            <td>{res.name} </td>
                            <td>{res.type}</td>
                            <td>{res.datetime}</td>
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