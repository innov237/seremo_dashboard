import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ApiService from '../../services/ApiService';

const datas = [
    {
        avatar: '',
        name: 'Roger Milla',
        phone: ' +237132546978',
        email: '',
        provider:'CAMTEL',
        country:'Cameroun',
        montant:'123.456',
        status:'PENDING',
    },
    {
        avatar: '',
        name: 'Nditap',
        phone: ' +237732546978',
        email: '',
        provider:'MTN',
        country:'Cameroun',
        montant:'123.456',
        status:'PENDING',
    },
    {
        avatar: '',
        name: 'Cyrille Makanaki',
        phone: ' +237932546978',
        email: '',
        provider:'ORANGE',
        country:'Cameroun',
        montant:'123.456',
        status:'PENDING',
    },
]
const UsersListPage: React.FC = () => {

    
    const [next, setNext] = useState<string>('');
    const [data, setData] = useState(datas)
    const [prev, setPrev] = useState<string>('');
    const [usersData, setUsersData] = useState<any>([]);
    const [isLoad, setLoader] = useState(true);
    const history = useHistory();


    const substringURL = (url:string) => {
        const rootURL = `${process.env.REACT_APP_API_URL}/api`
        return url.substring(rootURL.length, url.length);
    }

    const updateAction = (action:string, user:any) => {
        
        const newData = data.map(e => {

            if (e.name == user.name)
                return Object.assign(e, {status:action})
            else
                return e
        })

        setData(newData)

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
        //getAllUser();
    }, [])

    const up = () => `page-item ${(next) ? '' : 'disabled'}`;
    const down = () => `page-item ${(prev) ? '' : 'disabled'}`;

    const getUserDetail = (usersData: any) => {
        history.push("DetailtransactionUser", usersData);
    }

    return (
        <div>
            <p className="header__title">Demande de retrait</p>
            {isLoad ? (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                </div>
            ) : ""}
            <table className="table">
                <tbody>
                <tr className="theader">
                    <th>Avatar</th>
                    <th>Demandeur</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Provider</th>
                    <th>Country</th>
                    <th>Montant</th>
                    <th>Status</th>
                    <th>More</th>
                </tr>
                
                {data.length > 0 && data.map((res: any,index: any) => {
                    return (<tr key={index}>
                        <td><img src={res.avatar} className="user__avatar" alt="avatar" /> {res.name} <span className="span__contry"></span></td>
                        <td>{res.name}</td>
                        <td>{res.phone}</td>
                        <td>{(res.email) ? res.email : '-'}</td>
                        <td>{res.provider}</td>
                        <td>{res.country}</td>
                        <td>{res.montant}</td>
                        <td>{res.status}</td>
                        <td className="d-flex">
                                    
                                    <div className="form-group mr-1" onClick={() => updateAction("VALIDATED",res)} style={{display: (res.status != "PENDING") ? 'none' : 'block'}}>
                                        <input type="submit" value="Accepter" className="btn btn-warning" />
                                    </div>
                                    <div className="form-group mr-1" onClick={() => updateAction("REJECTED",res)} style={{display: (res.status != "PENDING") ? 'none' : 'block'}}>
                                        <input type="submit" value="Rejetter"  className="btn btn-danger" />
                                    </div>
                                   
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