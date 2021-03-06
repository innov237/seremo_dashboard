import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { getHeapStatistics } from 'v8';
import ApiService from '../../services/ApiService';

const DashBoardPage: React.FC = (props) => {

    const [dateData, setDate] = useState<any>([]);
    const [lengthtransferData, setLengthTransferData] = useState<any>([]);
    const [amount, setamount] = useState(0);
    const [isLoard, setLoarder] = useState(true);

    useEffect(() => {
        getStatData();
    }, []);

    const getStatData = async () => {
        var response = await ApiService.getData("dashboard/getTransferStat");

        if (response != null) {
            var data: any = [];
            var nombre: any = [];
            var amount: any = 0;

            response.forEach((element: any) => {
                console.log(element.date);
                data.push(element.length);
                nombre.push(element.date);
                amount = amount + element.sum;
            });

            setDate(nombre);
            setLengthTransferData(data);
            setamount(amount);

            setLoarder(false);
        }
    }

    const setdataOnChar = () => {
        const data = {
            labels: dateData,
            datasets: [
                {
                    label: 'All transfers',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: lengthtransferData
                }
            ]
        };

        return data;
    }


    return (
        <div className="container-fluid">
            <div className="row counter__boxes">
                <div className="col-4">
                    <Link to="/admin/all-users">
                        <div className="card users__count__card p-5">
                            <h1 className="card_number">02</h1>
                            <h2>All Users</h2>
                            <div className='icon__row'>
                                <i className="fa fa-users"></i>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to="/admin/administrations">
                        <div className="card admin__count__card p-5">
                            <h1 className="card_number">03</h1>
                            <h2>All Admin</h2>
                            <div className='icon__row'>
                                <i className="fa fa-users-cog"></i>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-4">
                    <div className="card transfert__count__card p-5">
                        <h1 className="card_number">{amount} XAF</h1>
                        <h2>Total Transfert</h2>
                        <div className='icon__row'>
                            <i className="fa fa-wallet"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {isLoard ? (
                        <div className="progress mt-5">
                            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }}></div>
                        </div>
                    ) : ""}
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <h1><i className="fa fa-chart-bar" style={{ color: "green" }}></i> Line Statistics</h1>
                        </div>
                        <div className="card-body" >
                            <Line data={setdataOnChar()} />
                        </div>
                    </div>
                </div>
                <div className="col-4">

                    <div className="card">
                        <div className="card-header">
                            <h1><i className="fa fa-chart-bar" style={{ color: "orchid" }}></i> Bar Statistics</h1>
                        </div>
                        <div className="card-body" >
                            <Bar data={setdataOnChar()} />
                        </div>
                    </div>

                    <div className="card shadow-sm mt-5">
                        <div className="card-header">
                            <h1><i className="fa fa-chart-bar" style={{ color: "orange" }}></i> Counter</h1>
                        </div>
                        <div className="card-body" >
                            <p><i className="fa fa-calendar-minus" style={{ color: "green" }}></i> From {dateData[0]} to {dateData[dateData.length - 1]}</p>
                            <p><i className="fa fa-wallet" style={{ color: "blue" }}></i> Tansfer amount:  {amount} XAF</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashBoardPage;