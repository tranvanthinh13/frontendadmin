import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Menu from "./Menu";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './expostInvoid';
function InvoiceDetails() {
    const params = useParams();
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const [dataproductPromotion, setDataPoductPromotion] = useState([]);
    const [datadetail, setDataDetail] = useState([]);
    const [data, setData] = useState([]);
    const [datainvoice, setInvoice] = useState([]);
    const [dataproduct, setDataProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const usenavigate = useNavigate();
    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    }
    useEffect(() => {
        getData();
        getDataDetail();
    }, [])
    const handleShow = (id, quanti) => {
        getProductDetail(id);
        setQuantity(quanti)
        setShow(true);
    }
    const getProductDetail = (id) => {
        axios.get(`https://localhost:7225/api/Products/${id}`)
            .then((result) => {
                setDataProduct(result.data)
                setDataPoductPromotion(result.data.productPromotion)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const getDataDetail = () => {
        let id = params.id;
        axios.get(`https://localhost:7225/api/InvoiceDetails/${id}`)
            .then((result) => {
                setDataDetail(result.data)
                setInvoice(result.data.invoice)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const getData = () => {
        const token = sessionStorage.getItem('token')
        let id = params.id;
        axios.get(`https://localhost:7225/api/Invoices/${id}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((result) => {
                setData(result.data)
                setUser(result.data.applicationUser)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const editinvoid = () => {
        if (window.confirm("Bạn có chắc muốn hũy đơn hàng") === true) {
            if (data.status === 0) {
                toast.error("Đơn hàng của bạn đã bị hũy trước đó");
            } else {
                let id = params.id;
                const url = `https://localhost:7225/api/Invoices/${id}`;
                const data1 = {
                    "id": id,
                    "code": data.code,
                    "applicationUserId": user.id,
                    "applicationUser": null,
                    "issuedDate": data.issuedDate,
                    "shippingAddress": data.shippingAddress,
                    "shippingPhone": data.shippingPhone,
                    "total": data.total,
                    "status": 0
                }
                axios.put(url, data1)
                    .then((result) => {
                        getData();
                        clear();
                        toast.success('Đã hũy đơn hàng thành công');
                    }).catch((error) => {
                        toast.error(error);
                    })
            }
        }


    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const renderStatus = (item) => {
        if (item === 1) {
            return (
                <b className="text-danger  font-weight-bolder ">Chờ xác nhận</b>

            )

        }
        else if (item == 2) {
            return (
                <b b style={{ color: "#F29727" }} className=" font-weight-bolder ">Đã xác nhận</b>
            )
        }
        else if (item == 3) {
            return (
                <b style={{ color: "#F2BE22" }} className=" font-weight-bolder ">Đang giao</b>
            )
        }
        else if (item == 4) {
            return (
                <b style={{ color: "#22A699" }} className=" font-weight-bolder ">Đã giao</b>
            )
        }
        else {
            return (
                <b style={{ color: "red" }} className=" font-weight-bolder ">Đã hũy</b>
            )

        }
    }
    const clear = () => {
        setRating(0);
        setReview('');
    }
    const handleReview = (item) => {
        const token = sessionStorage.getItem('token');
        if (token === null) {
            toast.error('Vui lòng đăng nhập');
            usenavigate('/Login')
        }
        else {
            const url = 'https://localhost:7225/api/ProductReviews';
            const data1 = {
                "accountId": 1,
                "productId": item.id,
                "product": null,
                "rating": rating,
                "comment": review,
                "issuedDate": "2023-07-01T16:57:31.054Z",
                "status": true
            }


            axios.post(url, data1, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    toast.success(result.data.message);
                    setCount(count + 1);
                    handleClose();
                    clear();
                    console.log(result)
                }).catch((error) => {
                    toast.error(error);
                })

        }
    }
    const handleExpost = (item) => {
        if (data.status == 5) {
            toast.error("Đơn hàng đã Hủy không thể xuất hóa đơn")
        } else if (data.status == 1) {
            toast.error("Đơn hàng chưa được xác nhận không thể xuất hóa đơn")
        } else {
            handleShow3();
        }

    }
    return (
        <Fragment>
            <ToastContainer />

            <><div className="min-height-300 bg-primary position-absolute w-100" />
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
                                {/* <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                        <div className="input-group">
                                            <span className="input-group-text text-body">
                                                <i className="fas fa-search" aria-hidden="true" />
                                            </span>


                                        </div>

                                    </div> */}

                                <div className="row px-xl-4  ">
                                    <div
                                    >
                                        <Link className="btn btn-secondary " to={'../Invoice'}><h6 className="fa fa-arrow-left" /> trở về
                                        </Link>
                                    </div>
                                </div>
                                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            handleExpost(datadetail);
                                        }}
                                    >
                                        <i
                                            className="fa fa-file-pdf-o text-dark me-2"
                                            aria-hidden="true"
                                        />
                                        Xuất Hóa đơn
                                    </button>




                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="container-fluid py-4">


                        <div style={{ position: "relative" }} className="container-fluid py-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="row px-xl-5 ">
                                            <h4 className="font-weight-semi-bold m-0 pb-2"> Mã đơn hàng: {data.code} - {renderStatus(data.status)}</h4>
                                        </div>
                                        <div className="row px-xl-5  ">
                                            <p className="h6 text-grey">{data.issuedDate}</p>
                                        </div>
                                        <div className="row px-xl-5 pb-3 ">
                                            <table className="table  table-borderless table-hover  ">

                                                <tbody className="align-middle">
                                                    {

                                                        datadetail.map((item, Index) => {
                                                            return (

                                                                <tr key={Index}>
                                                                    <td className="align-middle">
                                                                        <img src={item.product.image} style={{ width: 180 }} />

                                                                    </td>
                                                                    <td>
                                                                        <p className="h6 text-uppercase" > {item.product.name}</p>
                                                                        <p className="mb-5">Số lượng: {item.quantity}</p>
                                                                        <div className="d-flex align-items-center">
                                                                            <h6 className="text-red">{VND.format((item.product.price - (item.product.productPromotion.percent * item.product.price) / 100))}</h6>
                                                                            <small className="text-muted ml-2">
                                                                                <del>{VND.format(item.product.price)}</del>
                                                                            </small>
                                                                        </div>

                                                                    </td>


                                                                </tr>
                                                            )
                                                        })

                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="px-xl-4 pb-3 ">

                                            <div
                                                className=" bg-grey "
                                                style={{ padding: 10 }}
                                            >
                                                <div className="d-flex align-items-center">


                                                    <div className=" align-middle flex-fill pl-1">

                                                        <h4 className="font-weight-semi-bold m-0">Thông tin khách hàng</h4>

                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                className=" bg-grey "
                                                style={{ padding: 5 }}
                                            >
                                                <div className="d-flex bg-grey align-items-center">
                                                    <h3 className="fa fa-user bg-grey m-0 mx-4" />

                                                    <div className=" align-middle flex-fill pl-1">

                                                        <p className="font-weight-semi-bold m-1">{user.userName}</p>

                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                className=" bg-grey "
                                                style={{ padding: 5 }}
                                            >
                                                <div className="d-flex bg-grey align-items-center">
                                                    <h3 className="fa fa-phone bg-grey m-0 mx-4" />

                                                    <div className=" align-middle flex-fill pl-1">

                                                        <p className="font-weight-semi-bold m-1">{user.phoneNumber}</p>

                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                className=" bg-grey "
                                                style={{ padding: 5 }}
                                            >
                                                <div className="d-flex bg-grey align-items-center">
                                                    <h3 className="fa fa-map-marker bg-grey m-0 mx-4" />

                                                    <div className=" align-middle flex-fill pl-1">

                                                        <p className="font-weight-semi-bold m-1">{data.shippingAddress}</p>

                                                    </div>
                                                </div>

                                            </div>




                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <Modal show={show3} onHide={handleClose3} >
                        <Modal.Header closeButton>
                            <Modal.Title>Xuất hóa đơn</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >

                            <div style={{ position: "relative" }} className="container-fluid py-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="row px-xl-5 ">
                                                <h4 className="font-weight-semi-bold m-0 pb-2"> Mã đơn hàng: {data.code} - {renderStatus(data.status)}</h4>
                                            </div>
                                            <div className="row px-xl-5  ">
                                                <p className="h6 text-grey">{data.issuedDate}</p>
                                            </div>
                                            <div className="row px-xl-5 pb-3 ">
                                                <table className="table  table-borderless table-hover  ">

                                                    <tbody className="align-middle">
                                                        {

                                                            datadetail.map((item, Index) => {
                                                                return (

                                                                    <tr key={Index}>
                                                                        <td className="align-middle">
                                                                            <img src={item.product.image} style={{ width: 180 }} />
                                                                        </td>
                                                                        <td>
                                                                            <p className="h6 text-uppercase" > {item.product.name}</p>
                                                                            <p className="mb-5">Số lượng: {item.quantity}</p>
                                                                            <div className="d-flex align-items-center">
                                                                                <h6 className="text-red">{VND.format((item.product.price - (item.product.productPromotion.percent * item.product.price) / 100))}</h6>
                                                                                <small className="text-muted ml-2">
                                                                                    <del>{VND.format(item.product.price)}</del>
                                                                                </small>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="px-xl-4 pb-3 ">

                                                <div
                                                    className=" bg-grey "
                                                    style={{ padding: 10 }}
                                                >
                                                    <div className="d-flex align-items-center">


                                                        <div className=" align-middle flex-fill pl-1">

                                                            <h4 className="font-weight-semi-bold m-0">Thông tin khách hàng</h4>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div
                                                    className=" bg-grey "
                                                    style={{ padding: 5 }}
                                                >
                                                    <div className="d-flex bg-grey align-items-center">
                                                        <h3 className="fa fa-user bg-grey m-0 mx-4" />

                                                        <div className=" align-middle flex-fill pl-1">

                                                            <p className="font-weight-semi-bold m-1">{user.userName}</p>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div
                                                    className=" bg-grey "
                                                    style={{ padding: 5 }}
                                                >
                                                    <div className="d-flex bg-grey align-items-center">
                                                        <h3 className="fa fa-phone bg-grey m-0 mx-4" />

                                                        <div className=" align-middle flex-fill pl-1">

                                                            <p className="font-weight-semi-bold m-1">{user.phoneNumber}</p>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div
                                                    className=" bg-grey "
                                                    style={{ padding: 5 }}
                                                >
                                                    <div className="d-flex bg-grey align-items-center">
                                                        <h3 className="fa fa-map-marker bg-grey m-0 mx-4" />

                                                        <div className=" align-middle flex-fill pl-1">

                                                            <p className="font-weight-semi-bold m-1">{data.shippingAddress}</p>

                                                        </div>
                                                    </div>

                                                </div>




                                            </div>
                                            <div className="px-xl-4 pb-3 ">
                                                <div
                                                    className=" bg-grey "
                                                    style={{ padding: 5 }}
                                                >
                                                    <div className="d-flex bg-grey align-items-center">
                                                        <h5>Tổng tiền: </h5>
                                                        <div className="">
                                                            <h6 style={{ color: "red" }} className="font-weight-semi-bold m-1">{VND.format(data.total)}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose3}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={() => {


                            }}>
                                <PDFDownloadLink preserveDrawingBuffer={true} document={<InvoicePDF invoiceData={datadetail} />} fileName={data.code + ".pdf"}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : 'Download now!'
                                    }
                                </PDFDownloadLink>
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </main>
                <div className="fixed-plugin"></div>
            </>

        </Fragment >
    )
}
export default InvoiceDetails;