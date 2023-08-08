import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import moment from "moment";
import Menu from "./Menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, addDays } from 'date-fns';
import 'moment/locale/vi';
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css"
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { blue } from "@mui/material/colors";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)
function Dashboard() {
    const token = sessionStorage.getItem("token")
    const [data, setData] = useState([]);
    const [datastock, setDatastock] = useState([]);
    const [data3, setdata3] = useState()
    const [datayear, setdatayear] = useState([])
    const [datainvoice, setDataInvoice] = useState([]);

    const [datenow, setDatenow] = useState(moment());
    const [count, setCount] = useState([]);

    const year = moment(datenow).get('year');
    const month = (moment(datenow).get('month')) + 1;
    const [issuedDate, setIssuedDate] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const IssuedDate = (date) => {
        setIssuedDate(date);
        setExpirationDate(null);
    };

    // define handler change function on check-out date
    const handleExpirationDate = (date) => {
        setExpirationDate(date);
    };
    useEffect(() => {
        moment.locale('vi');
        setDatenow(moment().utcOffset('+07:00'));
    }, []);
    useEffect(() => {
        getData();
        getDatastock();
        getData3()
        getDatayear();
        getCount();
    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/admin/Products/count')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    console.log(datenow)
    console.log(data3)
    const getDatastock = () => {
        axios.get('https://localhost:7225/api/admin/Products/stock')
            .then((result) => {
                setDatastock(result.data)
            })
            .catch((error) => {
                console.log(error)
            })


    }
    const getData3 = () => {
        axios.get('https://localhost:7225/api/Static/total/' + moment(datenow).format(),)
            .then((result) => {
                setdata3(result.data)
            })
            .catch((error) => {
                console.log(error)
            })


    }
    const getCount = () => {
        axios.get('https://localhost:7225/api/Static/total')
            .then((result) => {
                setCount(result.data)
            })
            .catch((error) => {
                console.log(error)
            })


    }
    const getDatayear = () => {
        axios.get("https://localhost:7225/api/Static/month?month=" + month + "&year=" + year)
            .then((result) => {
                setdatayear(result.data)
            })
            .catch((error) => {
                console.log(error)
            })


        console.log("object", datayear)
    }

    const getDataInvice = () => {
        const token = sessionStorage.getItem('token')
        //let id = params.id;
        axios.get(`https://localhost:7225/api/admin/ImportInvoices`
        )
            .then((result) => {
                setDataInvoice(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 10; // Tạo danh sách các năm từ 10 năm trước đến hiện tại
        const yearOptions = [];
        for (let year = startYear; year <= currentYear; year++) {
            yearOptions.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }
        return yearOptions;
    };
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };
    return (
        <Fragment>
            {token ?
                <>

                    <div className="min-height-300 bg-primary position-absolute w-100" />
                    <Menu />
                    <main className="main-content position-relative border-radius-lg ">
                        {/* Navbar */}
                        <nav
                            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
                            id="navbarBlur"
                            data-scroll="false"
                        >
                            <div className="container-fluid py-1 px-3">


                            </div>
                        </nav>
                        {/* End Navbar */}
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                            Số sản phẩm đang bán
                                                        </p>
                                                        <h5 className="font-weight-bolder">{data}</h5>

                                                    </div>
                                                </div>
                                                <div className="col-4 text-end">
                                                    <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                                        <i
                                                            className="ni ni-money-coins text-lg opacity-10"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                            Số lượng tồn kho
                                                        </p>
                                                        <h5 className="font-weight-bolder">{datastock}</h5>

                                                    </div>
                                                </div>
                                                <div className="col-4 text-end">
                                                    <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                                        <i
                                                            className="ni ni-world text-lg opacity-10"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                            Doanh thu hôm nay bán
                                                        </p>
                                                        <h5 className="font-weight-bolder"> {data3?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                                        <p className="mb-0">
                                                            <span className="text-success text-sm font-weight-bolder">
                                                                +{count}
                                                            </span>{" "}
                                                            Đơn hàng cho hôm nay
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-4 text-end">
                                                    <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                                        <i
                                                            className="ni ni-paper-diploma text-lg opacity-10"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                                            Doanh th tháng này
                                                        </p>
                                                        <h5 className="font-weight-bolder">{datayear?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>
                                                        {/* <p className="mb-0">
                                                            <span className="text-success text-sm font-weight-bolder">
                                                                +5%
                                                            </span>{" "}
                                                            than last month
                                                        </p> */}
                                                    </div>
                                                </div>
                                                <div className="col-4 text-end">
                                                    <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                                        <i
                                                            className="ni ni-cart text-lg opacity-10"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-12 mb-lg-0 mb-4">
                                    <div className="card z-index-2 h-100">
                                        <div className="card-header pb-0 px -3 pt-3 bg-transparent">
                                            <select
                                                style={{
                                                    width: '150px',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    outline: 'none',
                                                    fontFamily: 'Arial, sans-serif',
                                                    fontSize: '14px',
                                                }}
                                                value={selectedYear}
                                                onChange={handleYearChange}
                                            >
                                                <option value="">-- Chọn năm --</option>
                                                {getYearOptions()}
                                            </select>

                                            <RevenueByMonthsChart

                                                year={selectedYear}
                                            />
                                        </div>

                                    </div>
                                </div>

                            </div>


                        </div>
                    </main>
                    <div className="fixed-plugin"></div>
                </>
                : window.location.href = "/"}
        </Fragment>
    )
}
export default Dashboard;
const RevenueByMonthsChart = ({ year }) => {
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const responseData = [];

                for (let month = 1; month <= 12; month++) {
                    const response = await axios.get('https://localhost:7225/api/Static/month', {
                        params: {
                            month: month,
                            year: year
                        }
                    });

                    responseData.push(response.data);
                }

                setRevenueData(responseData);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenueData();
    }, [year]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        elements: {
            bar: {
                backgroundColor: 'blue',
                borderRadius: 20,
                borderSkipped: 'bottom'
            }
        }
    };

    const chartData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 5', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: revenueData
            }
        ]
    };

    return (
        <>
            <div className="title mb">Doanh thu theo tháng</div>
            <div>
                <Bar options={chartOptions} data={chartData} height={300} />
            </div>
        </>
    );
};