import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Menu from "../pages/Menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Banner() {
    const token = sessionStorage.getItem("token")
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [editID, setEditId] = useState('');
    const [editdescription, setEditDescription] = useState('')
    const [editImage, seteditImage] = useState("");
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/Banners')
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
        axios.get(`https://localhost:7225/api/Banners/${id}`)
            .then((result) => {
                setEditDescription(result.data.description);
                seteditImage(result.data.image);
                setEditId(id);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa quảng cáo này") == true) {
            axios.delete(`https://localhost:7225/api/Banners/${id}`)
                .then((result) => {
                    toast.success('Đã xóa Quảng cáo');
                    getData();
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleUpdate = () => {
        const url = `https://localhost:7225/api/Banners/${editID}`;
        const data = {
            "id": editID,
            "description": editdescription,
            "image": editImage,
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Đã sửa Quảng cáo');
                handleClose2();
            }).catch((error) => {
                toast.error(error);
            })
    }

    const clear = () => {

        setEditDescription('');
        setEditId('');
        setDescription('');
        setImage('');
        seteditImage('')
    }

    const submitImage = async (event) => {


        let Imagepath = ''

        const formdata = new FormData()
        if (image) {

            formdata.append('file', image)
            formdata.append('upload_preset', 'fupnsnco')

            const res = await fetch(`https://api.cloudinary.com/v1_1/dwkujomo6/image/upload`, {
                method: 'POST',
                body: formdata
            })
            const data = await res.json()
            Imagepath = data.secure_url
            const url = 'https://localhost:7225/api/Banners';
            const form = {
                "description": description,
                "image": Imagepath,

            }
            axios.post(url, form)
                .then((result) => {

                    clear();
                    toast.success('Đã thêm quảng cáo');
                    handleClose();
                    getData();
                }).catch((error) => {
                    toast.error(error);
                })

        }
    };

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
                                            <h6>Quảng cáo</h6>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">
                                                <table className="table align-items-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Hình ảnh
                                                            </th>

                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Mô tả
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
                                                                            <td >  <img
                                                                                style={{ width: "220px !important", height: "128px" }}
                                                                                src={item.image}
                                                                                className=""
                                                                            /></td>

                                                                            <a

                                                                                className="btn btn-link text-dark px-3 mb-0"


                                                                            >
                                                                                <td>{item.description}</td>
                                                                            </a>


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
                                    <Col><div><b>Hình ảnh:</b></div></Col>
                                    <Col><div><b>Mô tả:</b></div></Col>
                                </Row>
                                <Row>

                                    <Col>
                                        <img
                                            style={{ weiht: "auto", height: "220px" }}
                                            src={editImage}
                                            className="form-control"
                                        />

                                    </Col>
                                    <Col>

                                        <textarea
                                            rows={9}
                                            className="form-control input-lg"
                                            type="text" placeholder="Nhập thông tin chỉnh sửa"
                                            value={editdescription} onChange={(e) => setEditDescription(e.target.value)}
                                        />
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
                                <Modal.Title>Thêm quảng cáo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col>
                                        <div><b>Mô tả:

                                        </b></div>
                                    </Col>
                                    <Col> <div><b>Chọn ảnh</b></div></Col><Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={description} onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Col>
                                    <Col> <input className="form-control" type="file" onChange={(e) => {

                                        setImage(e.target.files[0])
                                    }} /></Col>
                                    <Col> <Button variant="primary" onClick={() => submitImage()}>
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

export default Banner
