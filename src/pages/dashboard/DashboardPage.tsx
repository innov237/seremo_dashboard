import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

const DashBoardPage: React.FC = (props) => {

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    return (
        <div className="container-fluid">
            <div className="row counter__boxes">
                <div className="col-4">
                    <Link to="/admin/all-users">
                        <div className="card users__count__card p-5">
                            <h1 className="card_number">03</h1>
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
                            <h1 className="card_number">08</h1>
                            <h2>All Admin</h2>
                            <div className='icon__row'>
                                <i className="fa fa-users-cog"></i>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to="/admin/all-users">
                        <div className="card transfert__count__card p-5">
                            <h1 className="card_number">01</h1>
                            <h2>New users</h2>
                            <div className='icon__row'>
                                <i className="fa fa-user-plus"></i>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <h1><i className="fa fa-chart-bar" style={{ color: "green" }}></i> Line Statistics</h1>
                        </div>
                        <div className="card-body" >
                            <Line data={data} />
                        </div>
                    </div>
                </div>
                <div className="col-4">

                    <div className="card">
                        <div className="card-header">
                            <h1><i className="fa fa-chart-bar" style={{ color: "orchid" }}></i> Bar Statistics</h1>
                        </div>
                        <div className="card-body" >
                            <Bar data={data} />
                        </div>
                    </div>

                    <div className="card shadow-sm mt-5">
                        <div className="card-header">
                            <h1><i className="fa fa-chart-bar" style={{ color: "orange" }}></i> Counter</h1>
                        </div>
                        <div className="card-body" >
                            <p><i className="fa fa-calendar-minus" style={{ color: "green" }}></i> From june to april 2020 :</p>
                            <p><i className="fa fa-wallet" style={{ color: "blue" }}></i> Tansert amount:  500XAF</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashBoardPage;