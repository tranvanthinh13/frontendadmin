import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Menu from "./Menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ProductsType() {
    const token = sessionStorage.getItem("token")
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const [name, setName] = useState('')
    const [status, setStatus] = useState(true)

    const [editID, setEditId] = useState('');
    const [editname, setEditName] = useState('')
    const [editstatus, setEditStatus] = useState(true)

    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/admin/ProductTypes')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleEidt = (id) => {
        //alert(id)
        handleShow2();
        axios.get(`https://localhost:7225/api/admin/ProductTypes/${id}`)
            .then((result) => {
                setEditName(result.data.name);
                setEditStatus(result.data.status);
                setEditId(id);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm") == true) {
            axios.delete(`https://localhost:7225/api/admin/ProductTypes/${id}`)
                .then((result) => {
                    toast.success('Đã xóa Loại sản phẩm');
                    getData();
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleUpdate = () => {
        const url = `https://localhost:7225/api/admin/ProductTypes/${editID}`;
        const data = {
            "id": editID,
            "name": editname,
            "status": editstatus,
            "Type": null
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                handleClose2();
                toast.success('Đã sửa Loại sản phẩm');
            }).catch((error) => {
                toast.error(error);
            })
    }
    const handleSave = () => {
        setStatus(true);
        const url = 'https://localhost:7225/api/admin/ProductTypes';
        const data = {
            "name": name,
            "status": status,
            "products": null
        }
        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Đã thêm Loại sản phẩm');
                handleClose();
            }).catch((error) => {
                toast.error(error);
            })
    }
    const clear = () => {
        setName('');
        setStatus(0);
        setEditName('');
        setEditStatus(0);
        setEditId('');
    }

    const handleEditStatusChange = (e) => {
        if (e.target.checked) {
            setEditStatus(true);
        }
        else {
            setEditStatus(false);
        }
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
                                            <h6>Thương hiệu</h6>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">
                                                <table className="table align-items-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Tên sản phẩm
                                                            </th>

                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Trạng thái
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
                                                                                <td>{item.name}</td>
                                                                            </a>

                                                                            <td >
                                                                                {renderStatus(item)}
                                                                            </td >
                                                                            <td colSpan={2}>
                                                                                <div className="ms-auto text-center mb-0">
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
                                <Row>
                                    <Col><div><b>Loại Sản phẩm</b></div></Col>
                                    <Col><div><b>Trạng thái:</b></div></Col>
                                </Row>
                                <Row>


                                    <Col>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={editname} onChange={(e) => setEditName(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <input type="checkbox"
                                            checked={editstatus === true ? true : false}
                                            onChange={(e) => handleEditStatusChange(e)} value={editstatus}
                                        />
                                        <label>Còn Hoạt động</label>
                                    </Col>

                                </Row>
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
                                <Row>
                                    <Col>
                                        <div><b>Nhập tên loại Sản phẩm:

                                        </b></div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={name} onChange={(e) => setName(e.target.value)}
                                        />
                                    </Col>

                                    <Col> <Button variant="primary" onClick={() => handleSave()}>
                                        Thêm
                                    </Button></Col>


                                </Row>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
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
export default ProductsType;