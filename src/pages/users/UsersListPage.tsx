import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ApiService from '../../services/ApiService';

const UsersListPage: React.FC = () => {

    

    const [usersData, setUsersData] = useState<any>([]);
    const [isLoad, setLoader] = useState(true);
    const history = useHistory();

    const getAllUser = async () => {

        var response = await ApiService.getData("v1/users");
        setUsersData(response.data);
        setLoader(false);
    }

    useEffect(() => {
        getAllUser();
    }, [])


    const getUserDetail = (usersData: any) => {
        history.push("DetailtransactionUser", usersData);
    }

    return (
        <div>
            <p className="header__title">All Users</p>
            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}
            <table className="table">
                <tbody>
                <tr className="theader">
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Provider</th>
                    <th>Country</th>
                    <th>More</th>
                </tr>
                
                {usersData.length > 0 && usersData.map((res: any,index: any) => {
                    return (<tr key={index}>
                        <td><img src={ApiService.imageUrl + res.attributes.user_avatar} className="user__avatar" alt="avatar" /> {res.attributes.userData?.user_name} <span className="span__contry"></span></td>
                        <td>{res.attributes.user_name}</td>
                        <td>{res.attributes.user_phone_number}</td>
                        <td>{(res.attributes.user_email) ? res.attributes.user_email : '-'}</td>
                        <td>{res.attributes.provider_name}</td>
                        <td>{res.attributes.country.name}</td>
                        <td style={{ textAlign: "center" }} className="more__td" onClick={() => getUserDetail(res)}>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersListPage;