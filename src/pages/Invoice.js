import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Menu from "./Menu";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './expostInvoid';
function Invoice({ }) {
    const token = sessionStorage.getItem("token")
    const params = useParams();
    const [datadetail, setDatadetail] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const [user, setUser] = useState([]);
    const [name, setName] = useState('')
    const [status, setStatus] = useState(true)

    const [editID, setEditId] = useState('');
    const [editcode, setEditcode] = useState('')
    const [editstatus, setEditStatus] = useState('')
    const [edittotal, setedittotal] = useState('');
    const [editapplicationUser, seteditapplicationUser] = useState('');
    const [editissuedDate, setEditissuedDate] = useState('');
    const [editshippingAddress, setEditshippingAddress] = useState('');
    const [editshippingPhone, setEditshippingPhone] = useState('');

    const [data, setData] = useState([]);
    const [dataname, setdataname] = useState([])
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(1)

    //const [options, setOptions] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        // const token = sessionStorage.getItem('token')
        //let id = params.id;
        axios.get(`https://localhost:7225/api/admin/Invoices`
        )
            .then((result) => {
                setData(result.data)

                setUser(result.data.applicationUser)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleEidt = (item) => {
        if (item.status == 4) {
            toast.error("Đơn hàng đã giao không được sửa")
        } else if (item.status == 5) {
            toast.error("Đơn hàng đã hủy không được sửa")
        } else {
            handleShow2();

            axios.get(`https://localhost:7225/api/admin/Invoices/${item.id}`
            )
                .then((result) => {
                    setEditcode(result.data.code);
                    seteditapplicationUser(result.data.applicationUserId);
                    setEditshippingAddress(result.data.shippingAddress)
                    setEditshippingPhone(result.data.shippingPhone)
                    setEditissuedDate(result.data.issuedDate)
                    setedittotal(result.data.total)
                    setEditStatus(result.data.status);
                    setEditId(item.id);
                    if (result.data.status === 1) {
                        setStatusOptions([
                            { value: 1, name: 'Chờ Xác nhận' },
                            { value: 2, name: 'Đã xác nhận' },
                            { value: 5, name: 'Đã hủy' },
                        ]);
                    }
                    else if (result.data.status === 2) {
                        setStatusOptions([
                            { value: 2, name: 'Đã xác nhận' },
                            { value: 3, name: 'Đang giao' },

                        ]);
                    }
                    else if (result.data.status === 3) {
                        setStatusOptions([
                            { value: 3, name: 'Đang giao' },
                            { value: 4, name: 'Đã giao' },


                        ]);
                    } else if (result.data.status === 4) {
                        setStatusOptions([
                            { value: 4, name: 'Đã giao' },

                        ]);
                    }
                    else {
                        setStatusOptions([
                            { value: 5, name: 'Đã hủy' },
                        ]);
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }



    const getDatadetail = (id) => {
        handleShow()
        axios.get(`https://localhost:7225/api/InvoiceDetails/${id}`)
            .then((result) => {

                setDatadetail(result.data)
            })

            .catch((error) => {
                console.log(error)
            })

    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm") == true) {
            axios.delete(`https://localhost:7225/api/admin/Invoices/${id}`)
                .then((result) => {
                    toast.success('Đã xóa Loại sản phẩm');
                    getData();
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleUpdate = (item) => {

        const url = `https://localhost:7225/api/admin/Invoices/${editID}`;
        const data =
        {
            "id": editID,
            "code": editcode,
            "applicationUserId": editapplicationUser,
            "applicationUser": null,
            "issuedDate": editissuedDate,
            "shippingAddress": editshippingAddress,
            "shippingPhone": editshippingPhone,
            "total": edittotal,
            "status": selectedOptions
        }

        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Đã cập nhật trạng thái');
            }).catch((error) => {
                toast.error(error);
            })


    }

    const clear = () => {
        setName('');
        setStatus(0);
        // setEditName('');
        setEditcode('');
        setEditStatus(1);

        setEditissuedDate('')
        setEditshippingAddress('')
        setEditshippingPhone('')
        setedittotal('')
        setEditId('');
    }


    const renderStatus = (item) => {
        if (item.status === 1) {
            return (
                <b className="text-danger text-sm font-weight-bolder">Chờ xác nhận</b>
            )

        }
        else if (item.status == 2) {
            return (
                <div><b b style={{ color: "#F29727" }} className="text-sm font-weight-bolder">Đã xác nhận</b></div>
            )
        }
        else if (item.status == 3) {
            return (
                <div><b style={{ color: "#F2BE22" }} className="text-sm font-weight-bolder">Đang giao</b></div>
            )
        }
        else if (item.status == 4) {
            return (
                <div><b style={{ color: "#22A699" }} className="text-sm font-weight-bolder">Đã giao</b></div>
            )
        }
        else {
            return (
                <div><b className="text-danger text-sm font-weight-bolder">Đã hủy</b></div>
            )

        }
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (

        <Fragment>
            {token ?
                <>
                    <ToastContainer />
                    <div className="min-height-300 bg-primary position-absolute w-100" />
                    <Menu />
                    <main className="main-content position-relative border-radius-lg ">
                        {/* Navbar */}
                        <nav
                            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
                            id="navbarBlzur"
                            data-scroll="false"
                        >
                            <div className="container-fluid py-1 px-3">

                                <div
                                    className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                                    id="navbar"
                                >
                                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">


                                    </div>


                                </div>
                            </div>
                        </nav>
                        {/* End Navbar */}
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-header pb-0">
                                            <h6>Hoá đơn</h6>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">
                                                <table className="table align-items-center mb-0">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Mã hoá đơn
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Người tạo</th>

                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Ngày lập
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Địa chỉ
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Số điện thoại
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Trạng thái
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Tổng tiền
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">

                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data && data.length > 0 ?
                                                                data.map((item, index) => {
                                                                    return (
                                                                        <tr key={index} className="text-center">
                                                                            <td ><b>{item.code}</b></td>
                                                                            {/* <a
                                                                        className="btn text-dark"
                                                                    >
                                                                        <td>{item.code}</td>
                                                                    </a> */}
                                                                            <td >{item.applicationUser.userName}</td>

                                                                            <td>{moment(item?.issuedDate).format('DD/MM/YYYY')}</td>
                                                                            <td className="text-start">{item.shippingAddress}</td>
                                                                            <td>{item.shippingPhone}</td>
                                                                            <td className="text-center">{renderStatus(item)}</td>
                                                                            <td><b>{item.total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b></td>
                                                                            <td>
                                                                                <Link
                                                                                    className="btn text-green"
                                                                                    to={`../invoicedetail/${item.id}`}
                                                                                >
                                                                                    Chi tiết
                                                                                </Link></td>


                                                                            <td>
                                                                                <button
                                                                                    className="btn text-green"
                                                                                    onClick={() => handleEidt(item)}
                                                                                >
                                                                                    <i
                                                                                        className="fas fa-pencil-alt text-dark me-2"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                    Trạng thái
                                                                                </button>


                                                                            </td>

                                                                        </tr>
                                                                    )
                                                                })
                                                                :
                                                                <div>
                                                                    <iframe src="https://lottie.host/?file=4e69acc2-a611-4a67-8176-43da7cf8e6b5/Xv7wi2nXdJ.json">
                                                                        Đang tải </iframe>

                                                                </div>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <Modal show={show2} onHide={handleClose2} >
                            <Modal.Header closeButton>
                                <Modal.Title>Cập nhật trạng thái đơn hàng</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >

                                <div >
                                    <label
                                        htmlFor="example-text-input"
                                        className="form-control-label"
                                    >
                                        Trạng thái:
                                    </label>

                                    {statusOptions.length > 0 && (
                                        <div className="text-center ">

                                            <select

                                                className="btn btn-secondary"
                                                onChange={(e) => {
                                                    setSelectedOptions(e.target.value)
                                                }}
                                            >

                                                {statusOptions.map((option) => (
                                                    <option className="btn btn-secondary"
                                                        key={option.value}
                                                        value={option.value}
                                                        selected={option.value === editstatus ? true : false}
                                                    >
                                                        {option.name}
                                                    </option>
                                                ))}
                                                {console.log(selectedOptions)}

                                            </select>
                                        </div>
                                    )}
                                </div>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose2}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={() => {
                                    handleUpdate(selectedOptions);
                                    handleClose2();

                                }}>
                                    Cập nhật
                                </Button>
                            </Modal.Footer>
                        </Modal>



                    </main>
                    <div className="fixed-plugin"></div>

                </>
                : window.location.href = "/"}
        </Fragment>

    )
}





export default Invoice
