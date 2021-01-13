import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ApiService from '../../services/ApiService';

const UsersListPage: React.FC = () => {

    
    const [next, setNext] = useState<string>('');
    const [prev, setPrev] = useState<string>('');
    const [usersData, setUsersData] = useState<any>([]);
    const [isLoad, setLoader] = useState(true);
    const history = useHistory();


    const substringURL = (url:string) => {
        const rootURL = `${process.env.REACT_APP_API_URL}/api`
        return url.substring(rootURL.length, url.length);
    }

    const getAllUser = async (data:string='') => {
        let url = "v1/users"
        if (data != '')
            url = substringURL(data)

        var response = await ApiService.getData(url);
        setUsersData(response.data);
        setNext(response.next);
        setPrev(response.prev)
        setLoader(false);
    }

    useEffect(() => {
        getAllUser();
    }, [])

    const up = () => `page-item ${(next) ? '' : 'disabled'}`;
    const down = () => `page-item ${(prev) ? '' : 'disabled'}`;

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
                    <th>More</th>
                </tr>
                
                {usersData.length > 0 && usersData.map((res: any,index: any) => {
                    return (<tr key={index}>
                        <td>
                            <div><img src={res.attributes.user_avatar} className="user__avatar" alt="avatar" /> <span>{res.attributes.user_name}</span></div>
                            <div className="d-flex justify-content-start"><img src={res.attributes.country.flag} className="user__avatar" alt="avatar" /> <span className="span__contry">{res.attributes.country.name}</span> </div>

                         </td>
                        <td>{res.attributes.user_name}</td>
                        <td>{res.attributes.user_phone_number}</td>
                        <td>{(res.attributes.user_email) ? res.attributes.user_email : '-'}</td>
                        <td>{res.attributes.provider_name}</td>
                        <td style={{ textAlign: "center" }} className="more__td" onClick={() => getUserDetail(res)}>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
             <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={down()} onClick={ () => getAllUser(prev)} ><a className="page-link" >Previous</a></li>
                    
                    <li className={up()} onClick={ () => getAllUser(next)}><a className="page-link" >Next</a></li>
                  </ul>
                </nav>
            </div>
        </div>
    )
}

export default UsersListPage;