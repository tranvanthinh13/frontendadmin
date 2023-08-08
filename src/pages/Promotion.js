import React, { Fragment, useEffect, useState } from "react";
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
import DatePicker from "react-datepicker";
import * as Yup from 'yup';
import "../../node_modules/react-datepicker/dist/react-datepicker.css"

function Promotion() {
    const token = sessionStorage.getItem("token")
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [promotionName, setPromotionName] = useState('')
    const [description, setdescription] = useState('')
    const [percent, setPercent] = useState('')
    const [editpromotionName, seteditPromotionName] = useState('')
    const [editpercent, seteditPercent] = useState('')
    const [editdescription, seteditdescription] = useState('')
    const [editID, setEditId] = useState('');
    const [issuedDate, setIssuedDate] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [editissuedDate, seteditIssuedDate] = useState(null);
    const [editexpirationDate, seteditExpirationDate] = useState(null);
    const [editnew, Seteditnew] = useState(true)
    const IssuedDate = (date) => {
        setIssuedDate(date);
        setExpirationDate(null);
    };
    const handleExpirationDate = (date) => {
        setExpirationDate(date);
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7225/api/admin/ProductPromotions/update-promotion-status');
            getData();
            console.log(response.data); // In kết quả trả về từ API
        } catch (error) {
            console.error(error);
        }
    };
    const getData = () => {
        axios.get('https://localhost:7225/api/admin/ProductPromotions')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleEidt = (id) => {

        handleShow2();
        axios.get(`https://localhost:7225/api/admin/ProductPromotions/${id}`)
            .then((result) => {
                seteditPromotionName(result.data.promotionName);
                seteditPercent(result.data.percent)
                seteditExpirationDate(result.data.expirationDate)
                seteditIssuedDate(result.data.issuedDate)
                seteditdescription(result.data.description)
                Seteditnew(result.data.status);
                setEditId(id);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm") == true) {
            axios.delete(`https://localhost:7225/api/admin/ProductPromotions/${id}`)
                .then((result) => {
                    if (result.data.status === "Error") {
                        getData();
                        toast.error(result.data.message);
                    } else {
                        getData();
                        toast.success(result.data.message);
                    }


                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleUpdate = async () => {

        const url = `https://localhost:7225/api/admin/ProductPromotions/${editID}`;
        const data = {
            "id": editID,
            "promotionName": editpromotionName,
            "percent": editpercent,
            "description": editdescription,
            "issuedDate": moment(editissuedDate).format(),
            "expirationDate": moment(editexpirationDate).format(),
            "status": editnew,
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                handleClose2();
                clear();
                toast.success('Đã sửa khuyến mãi');
            }).catch((error) => {
                toast.error(error);
            })

    }


    const Schema = Yup.object().shape({


        promotionName: Yup.string()
            .required('tên đợt khuyến mãi  không được để trống'),
        percent: Yup.string()
            .required('phần trăm không được để trống'),


    });


    const handleSave = async () => {
        try {
            await Schema.validate({ promotionName, percent }, { abortEarly: false });
            const url = 'https://localhost:7225/api/admin/ProductPromotions';
            const data = {
                "promotionName": promotionName,
                "percent": percent,
                "description": description,
                "issuedDate": moment(issuedDate).format(),
                "expirationDate": moment(expirationDate).format(),
                "status": true

            }
            console.log("data:", data)
            axios.post(url, data)
                .then((result) => {
                    getData();
                    clear();
                    handleClose();
                    toast.success('Đã thêm khuyến mãi');
                }).catch((error) => {
                    toast.error(error);
                })
        } catch (err) {
            const validationErrors = err.inner;
            validationErrors.forEach((error) => {
                toast.error(error.message);
            });
        }
    }
    const clear = () => {
        setPromotionName('');
        setdescription('');
        seteditdescription('')
        setPercent('');
        setIssuedDate('');
        setExpirationDate('');
        seteditPercent('');
        seteditIssuedDate('');
        seteditExpirationDate('');
        // setEditName('');
        // setEditStatus(0);
        setEditId('');
    }
    const renderStatus = (item) => {
        if (item.status) {
            return (
                <div className="align-middle text-center text-sm">
                    <span className="badge badge-sm bg-gradient-success">
                        Còn hiệu lực
                    </span></div>
            )
            // setEditStatus(true);
        }
        else {
            return (<div className="align-middle text-center text-sm">
                <span className="badge badge-sm bg-gradient-secondary">
                    Hết hiệu lực
                </span>
            </div>)
            // setEditStatus(false);
        }
    }
    const handleEditStatusChange = (e) => {
        if (e.target.checked) {
            Seteditnew(true);
        }
        else {
            Seteditnew(false);
        }
    }
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
                                        {/* <div className="input-group">
                                            <span className="input-group-text text-body">
                                                <i className="fas fa-search" aria-hidden="true" />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm ở đây..."
                                            />
                                        </div> */}
                                        <div className="col-6 text-end">
                                            <a style={{ width: "max-content" }}
                                                className="btn bg-gradient-dark mb-0"
                                                onClick={() => handleShow()}
                                            >
                                                <i className="fas fa-plus" />
                                                &nbsp;&nbsp;Thêm

                                            </a>
                                        </div>
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
                                            <h6>Khuyến mãi</h6>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">
                                                <table className="table align-items-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Khuyến mãi đợt
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Chi tiết
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Giảm(%)
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Trạng thái
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Ngày bắt đầu
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Ngày kết thúc
                                                            </th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Chức năng
                                                            </th>




                                                        </tr>
                                                    </thead>
                                                    <tbody>



                                                        {
                                                            data && data.length > 0 ?
                                                                data.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            {/* 
                                                                        <div className="d-flex px-2 py-1">

                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                <td> <h6 className="mb-0 text-sm">{item.name}</h6></td>

                                                                            </div>
                                                                        </div> */}
                                                                            <a

                                                                                className="btn btn-link text-dark px-3 mb-0"


                                                                            >

                                                                                <td>{item.promotionName}</td>
                                                                            </a>

                                                                            <td className="text-center">{item.description}</td>
                                                                            <td className="text-center">{item.percent}</td>
                                                                            <td >
                                                                                {renderStatus(item)}
                                                                            </td >
                                                                            <td className="text-center">{moment(item?.issuedDate).format('DD/MM/YYYY')}</td>
                                                                            <td className="text-center">{moment(item?.expirationDate).format('DD/MM/YYYY')}</td>


                                                                            {/* <td >
                                                                            {renderStatus(item)}
                                                                        </td > */}
                                                                            <td colSpan={2}>
                                                                                <div className="ms-auto text-center">
                                                                                    <a
                                                                                        className="btn btn-link text-dark px-3 mb-0"
                                                                                        onClick={() => handleEidt(item.id)}
                                                                                    >
                                                                                        <i
                                                                                            className="fas fa-pencil-alt text-dark me-2"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        Sửa
                                                                                    </a>
                                                                                    <a
                                                                                        className="btn btn-link text-danger text-gradient px-3 mb-0"
                                                                                        onClick={() => handleDelect(item.id)}
                                                                                    >
                                                                                        <i className="far fa-trash-alt me-2" />
                                                                                        Xoá
                                                                                    </a>

                                                                                </div>


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
                        <Modal show={show2} onHide={handleClose2}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chỉnh Sửa</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Tên đợt khuyến mãi:
                                            </label>
                                            <input
                                                value={editpromotionName}
                                                className="form-control"
                                                placeholder="Nhập tên đợt khuyến mãi"
                                                onChange={(e) => seteditPromotionName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Mô tả:
                                            </label>
                                            <input
                                                value={editdescription}
                                                className="form-control"
                                                placeholder="Nhập mô tả khuyến mãi"
                                                onChange={(e) => seteditPromotionName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Giảm(nhập số):
                                            </label>
                                            <input
                                                value={editpercent}
                                                className="form-control"
                                                placeholder="Nhập mô tả khuyến mãi"
                                                onChange={(e) => seteditPercent(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ngày bắt đầu:
                                            </label>
                                            <input type="date" className="from-control" placeholder="Nhập  tại đây"
                                                value={moment(editissuedDate).format('YYYY-MM-DD')} onChange={(e) => seteditIssuedDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ngày kết thúc:
                                            </label>
                                            <input type="date" className="from-control" placeholder="Nhập  tại đây"

                                                value={moment(editexpirationDate).format('YYYY-MM-DD')} onChange={(e) => seteditExpirationDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Trạng thái:
                                            </label>
                                            <input style={{ marginLeft: "55px" }} type="checkbox"
                                                checked={editnew === true ? true : false}
                                                onChange={(e) => handleEditStatusChange(e)} value={editnew}
                                            />
                                            <label>Còn hiệu lực</label>

                                        </div>
                                    </div>
                                </div>



                                {/* <Row>

                                    <Col>
                                        <input type="date" className="from-control" placeholder="Nhập  tại đây"
                                            value={moment(editissuedDate).format('YYYY-MM-DD')} onChange={(e) => seteditIssuedDate(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <input type="date" className="from-control" placeholder="Nhập  tại đây"

                                            value={moment(editexpirationDate).format('YYYY-MM-DD')} onChange={(e) => seteditExpirationDate(e.target.value)}
                                        />
                                    </Col>

                                </Row> */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose2}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={handleUpdate}>
                                    Cập nhật
                                </Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thêm loại sản phẩm tại đây</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Tên của đợt khuyến mãi
                                            </label>
                                            <input
                                                className="form-control"
                                                placeholder="Nhập tên đợt khuyến mãi"
                                                value={promotionName} onChange={(e) => setPromotionName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Mô tả
                                            </label>
                                            <textarea

                                                rows={2}
                                                className="form-control"

                                                value={description} onChange={(e) => setdescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Phần trăm giảm giá(Nhập số):
                                            </label>
                                            <input
                                                className="form-control"
                                                placeholder="Nhập số"
                                                value={percent} onChange={(e) => setPercent(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ngày bắt đầu:
                                            </label>
                                            <DatePicker
                                                selected={issuedDate}
                                                minDate={new Date()}
                                                onChange={IssuedDate}

                                                dateFormat="dd/MM/yyyy"

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-13">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ngày Kết thúc:
                                            </label>

                                            <DatePicker
                                                selected={expirationDate}
                                                minDate={issuedDate}
                                                onChange={handleExpirationDate}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>

                                    {expirationDate && issuedDate && (
                                        <div className="summary">
                                            <p>
                                                Chương trình này khuyến mãi sẽ được áp dụng từ ngày{" "}{moment(issuedDate).format("DD/MM/YYYY")}{" "}đến ngày{" "}
                                                {moment(expirationDate).format("DD/MM/YYYY")}.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {/* <Row>
                                    <Col>
                                        <div><b>Đợt khuyến mãi thứ:

                                        </b></div>
                                    </Col>
                                    <Col>
                                        <div><b>Giảm giá(%):

                                        </b></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col><input type="text" className="from-control"
                                        value={promotionName} onChange={(e) => setPromotionName(e.target.value)}
                                    /></Col>
                                    <Col><input type="text" className="from-control"
                                        value={percent} onChange={(e) => setPercent(e.target.value)}
                                    /></Col>
                                </Row>


                                <Row>
                                    <Col>
                                        <div><b>Ngày bắt đầu:

                                        </b></div>
                                    </Col>
                                    <Col>
                                        <div><b>Ngày kết thúc:

                                        </b></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col><DatePicker
                                        selected={issuedDate}
                                        minDate={new Date()}
                                        onChange={IssuedDate}

                                        dateFormat="dd/MM/yyyy"

                                    /></Col>
                                    <Col><DatePicker
                                        selected={expirationDate}
                                        minDate={issuedDate}
                                        onChange={handleExpirationDate}
                                        dateFormat="dd/MM/yyyy"
                                    /></Col>
                                </Row>
                                {expirationDate && issuedDate && (
                                    <div className="summary">
                                        <p>
                                            Chương trình này khuyến mãi sẽ được áp dụng từ ngày{" "}{moment(issuedDate).format("DD/MM/YYYY")}{" "}đến ngày{" "}
                                            {moment(expirationDate).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>
                                )} */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Thêm
                                </Button>
                            </Modal.Footer>


                        </Modal>
                    </main>
                    <div className="fixed-plugin"></div>
                </>
                : (window.location.href = "/")
            }
        </Fragment>
    )
}


export default Promotion
