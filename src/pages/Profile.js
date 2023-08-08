
import Menu from "./Menu";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
function Profile() {
    const [userName, setUserName] = useState('')
    const [fullname, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address1, setAddress1] = useState('')


    const [editID, setEditId] = useState('');
    const [dataaccount, setDataaccount] = useState([]);
    const [datainvoice, setDataInVoice] = useState([]);
    const [disabledFN, setDisabledFN] = useState(true);
    const [disabledE, setDisabledE] = useState(true);
    const [disabledP, setDisabledP] = useState(true);
    const [disabledA, setDisabledA] = useState(true);
    const [password, setPassWord] = useState('')
    const [passwordNew, setPassWordNew] = useState('')
    const [passwordS, setPassWordS] = useState('')
    const token = sessionStorage.getItem("token")
    const [data, setData] = useState([]);

    useEffect(() => {
        getatataaccount();

    }, [])
    const usenavigate = useNavigate();
    const getatataaccount = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/admin/Accounts/GetUser', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setDataaccount(result.data)
                setData(result.data)
                setUserName(result.data.userName)
                setFullName(result.data.fullName)
                setAddress1(result.data.address1)

                setEmail(result.data.email)
                setPhone(result.data.phoneNumber)
            })

            .catch((error) => {
                console.log(error)
            })
    }
    const passwordSchema = Yup.string()
        .required('Mật khẩu không được để trống')
        .min(8, 'Mật khẩu phải dài ít nhất 8 ký tự')
        .matches(
            /^(?=.*\d)(?=.*[!@#$%?*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%?*]{8,}$/,
            "Mật khẩu có ít nhất 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
        );
    const Schema = Yup.object().shape({
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
            .required('Số điện thoại không được để trống'),
        email: Yup.string()
            .required('Email không được để trống')
            .email('Invalid email address'),
        address1: Yup.string()
            .required('Địa chỉ không được để trống không được để trống'),
        // address2: Yup.string()
        //     .required('Địa chỉ không được để trống không được để trống'),
        fullname: Yup.string()
            .required('Họ và tên(đầy đủ) không được để trống')
            .max(50, 'Họ và tên(đầy đủ) quá dài'),

    });
    const handleUpdate = async () => {

        try {
            await Schema.validate({ phone, email, address1, fullname }, { abortEarly: false });
            const url = "https://localhost:7225/api/Accounts/" + dataaccount.id;
            const data1 = {
                "address1": address1,
                "address2": dataaccount.address2,
                "fullName": fullname,
                "avatar": data.avatar,
                "status": data.status,
                "id": dataaccount.id,
                "userName": userName,
                "normalizedUserName": dataaccount.normalizedUserName,
                "email": email,
                "normalizedEmail": email.toUpperCase(),
                "emailConfirmed": false,
                "passwordHash": dataaccount.papasswordHash,
                "securityStamp": dataaccount.securityStamp,
                "concurrencyStamp": dataaccount.concurrencyStamp,
                "phoneNumber": phone,
                "phoneNumberConfirmed": false,
                "twoFactorEnabled": false,
                "lockoutEnd": null,
                "lockoutEnabled": true,
                "accessFailedCount": 0
            }
            axios.put(url, data1)
                .then((result) => {
                    getatataaccount();
                    handleClose2();
                    setDisabledE(true);
                    setDisabledA(true);
                    setDisabledFN(true);
                    setDisabledP(true)
                    toast.success('Đã thay đổi thành công');
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




    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const handleChangePassWord = async () => {
        try {
            await passwordSchema.validate(passwordNew, { abortEarly: false });
            await passwordSchema.validate(passwordS, { abortEarly: false });

            if (passwordNew !== passwordS) {
                toast.error('Mật khẩu mới và mật khẩu xác nhận không trùng khớp');
            } else {
                const url = 'https://localhost:7225/api/Accounts/ChangePassword'
                const data = {
                    "username": dataaccount.userName,
                    "oldPassword": password,
                    "newPassword": passwordNew
                }
                axios.put(url, data)
                    .then((result) => {
                        toast.success('Đã thay đổi thành công');
                        usenavigate('Profile')
                    }).catch((error) => {
                        toast.error("Thay đổi không thành công");
                    })
            }
            toast.success('Đã thay đổi thành công');
        } catch (err) {
            const validationErrors = err.inner;
            validationErrors.forEach((error) => {
                toast.error(error.message);
            });
        }


    }


    return (
        <Fragment>
            {token ?

                <>
                    <ToastContainer />
                    <div
                        className="position-absolute w-100 min-height-300 top-0"
                        style={{
                            backgroundImage:
                                'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg")',
                            backgroundPositionY: "50%"
                        }}
                    >
                        <span className="mask bg-primary opacity-6" />
                    </div>
                    <Menu />
                    <div className="main-content position-relative max-height-vh-100 h-100">

                        <nav className="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2 mt-n11">
                            <div className="container-fluid py-1">


                            </div>
                        </nav>
                        {/* End Navbar */}
                        <div className="card shadow-lg mx-4 card-profile-bottom">
                            <div className="card-body p-3">
                                <div className="row gx-4">
                                    <div className="col-auto">
                                        <div className="avatar avatar-xl position-relative">
                                            <img
                                                src={dataaccount.avatar}
                                                alt="profile_image"
                                                className="w-100 border-radius-lg shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto my-auto">
                                        <div className="h-100">
                                            <h5 className="mb-1">{dataaccount.userName}</h5>
                                            <p className="mb-0 font-weight-bold text-sm">{dataaccount.fullName}</p>
                                        </div>
                                    </div>
                                    <div style={{ paddingLeft: "80px" }} className="col-auto">



                                        <div style={{


                                            borderColor: " #C5DFF8"
                                        }} >
                                            <a
                                                className="btn btn-link text-dark px-3 mb-0"
                                                onClick={toggleDropdown}
                                            >
                                                <i
                                                    className="ni ni-settings-gear-65"
                                                    aria-hidden="true"
                                                />
                                                Cài đặt
                                            </a>

                                            {isOpen && (
                                                <ul style={{


                                                    backgroundColor: "#fff",
                                                    border: "1px solid #ccc",
                                                    padding: "0",
                                                    margin: "0",
                                                    listStyle: "none"
                                                }}>
                                                    {/* <li style={{ padding: "10px" }}>Quên mật khẩu</li> */}
                                                    <li style={{ padding: "10px" }}
                                                        onClick={
                                                            () => {
                                                                handleShow2();
                                                                setIsOpen(!isOpen);
                                                            }}>Chỉnh sửa</li>
                                                    <li style={{ padding: "10px" }} onClick={
                                                        () => {
                                                            handleShow();
                                                            setIsOpen(!isOpen);
                                                        }}>Đổi mật khẩu</li>
                                                    <li style={{ padding: "10px" }} onClick={
                                                        () => {
                                                            handleClose3();
                                                            setIsOpen(!isOpen);
                                                        }}>Thay đổi ảnh</li>

                                                </ul>
                                            )}
                                        </div>





                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">

                                        <div className="card-body">
                                            <p className="text-uppercase text-sm">Thông tin tài khoản</p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="form-control-label"
                                                        >
                                                            Họ tên
                                                        </label>
                                                        <label className="form-control">{dataaccount.fullName}</label>

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="form-control-label"
                                                        >
                                                            Email
                                                        </label>
                                                        <label className="form-control">{dataaccount.email}</label>

                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="form-control-label"
                                                        >
                                                            Tên đăng nhập
                                                        </label>
                                                        <label className="form-control">{dataaccount.userName}</label>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="form-control-label"
                                                        >
                                                            Số điện thoại
                                                        </label>
                                                        <label className="form-control">{dataaccount.phoneNumber}</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="form-control-label"
                                                        >
                                                            Địa chỉ
                                                        </label>
                                                        <label className="form-control">{dataaccount.address1}</label>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-profile">
                                        <img
                                            src="../assets/img/bg-profile.jpg"
                                            alt="Image placeholder"
                                            className="card-img-top"
                                        />
                                        <div className="row justify-content-center">
                                            <div className="col-4 col-lg-4 order-lg-2">
                                                <div className="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                                                    <a href="javascript:;">
                                                        <img
                                                            src={dataaccount.avatar}
                                                            className="rounded-circle img-fluid border border-2 border-white"
                                                        />
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="card-body pt-0">

                                            <div className="text-center mt-4">
                                                <h5>
                                                    {dataaccount.userName}<span className="font-weight-light"></span>
                                                </h5>

                                                <div className="h6 font-weight-300">
                                                    <i className="ni location_pin mr-2" />
                                                    {dataaccount.email}
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="row">
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Nhập mật khẩu hiện tại:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="password"
                                                value={password} onChange={(e) => setPassWord(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Nhập mật khẩu Mới:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="password" placeholder="Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
                                                value={passwordNew} onChange={(e) => setPassWordNew(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Nhập lại mật khẩu vừa nhập:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="password" placeholder="Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
                                                value={passwordS} onChange={(e) => setPassWordS(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <Form.Floating className="mb-3">
                                    <label htmlFor="floatingInputCustom" className="font-weight-semi-bold h6">Nhập mật khẩu hiện tại</label>
                                    <Form.Control
                                        className="forms-control ml-1 mt-2"
                                        id="floatingInputCustom"
                                        type="password"
                                        placeholder="Nhập mật khẩu hiện tại của bạn"
                                        value={password} onChange={(e) => setPassWord(e.target.value)}
                                    />

                                </Form.Floating> */}
                                {/* <Form.Floating>
                                    <label htmlFor="floatingPasswordCustom" className="font-weight-semi-bold h6">Tạo mật khẩu mới</label>
                                    <Form.Control
                                        className="forms-control ml-1 mt-2"
                                        id="floatingPasswordCustom"
                                        type="password"
                                        placeholder="Nhập mật khẩu mới của bạn"
                                        value={passwordNew} onChange={(e) => setPassWordNew(e.target.value)}
                                    />
                                    <p className="text-red"></p>
                                    <Form.Control
                                        className="forms-control ml-1 mt-2"
                                        id="floatingPasswordCustom"
                                        type="password"
                                        placeholder="Xác nhận lại mật khẩu"
                                        value={passwordS} onChange={(e) => setPassWordS(e.target.value)}
                                    />
                                </Form.Floating> */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={
                                    () => { handleChangePassWord() }}>Đổi mật khẩu</Button>

                            </Modal.Footer>
                        </Modal>
                        <Modal show={show2} onHide={handleClose2}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cập nhật thông tin tại đây</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Tên đăng nhập:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="text"
                                                value={userName} onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Họ và tên:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="text"
                                                value={fullname} onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Email:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="text"
                                                value={email} onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Số điện thoại:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="text"
                                                value={phone} onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Địa chỉ:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="text"
                                                value={address1} onChange={(e) => setAddress1(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose2}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={
                                    () => { handleUpdate() }}>
                                    Cập nhật thông tin
                                </Button>


                            </Modal.Footer>
                        </Modal>


                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="row">
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Nhập mật khẩu hiện tại:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="password"
                                                value={password} onChange={(e) => setPassWord(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Nhập mật khẩu Mới:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="password" placeholder="Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
                                                value={passwordNew} onChange={(e) => setPassWordNew(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Nhập lại mật khẩu vừa nhập:
                                            </label>
                                            <input
                                                className="form-control input-lg"
                                                type="password" placeholder="Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
                                                value={passwordS} onChange={(e) => setPassWordS(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <Form.Floating className="mb-3">
                                    <label htmlFor="floatingInputCustom" className="font-weight-semi-bold h6">Nhập mật khẩu hiện tại</label>
                                    <Form.Control
                                        className="forms-control ml-1 mt-2"
                                        id="floatingInputCustom"
                                        type="password"
                                        placeholder="Nhập mật khẩu hiện tại của bạn"
                                        value={password} onChange={(e) => setPassWord(e.target.value)}
                                    />

                                </Form.Floating> */}
                                {/* <Form.Floating>
                                    <label htmlFor="floatingPasswordCustom" className="font-weight-semi-bold h6">Tạo mật khẩu mới</label>
                                    <Form.Control
                                        className="forms-control ml-1 mt-2"
                                        id="floatingPasswordCustom"
                                        type="password"
                                        placeholder="Nhập mật khẩu mới của bạn"
                                        value={passwordNew} onChange={(e) => setPassWordNew(e.target.value)}
                                    />
                                    <p className="text-red"></p>
                                    <Form.Control
                                        className="forms-control ml-1 mt-2"
                                        id="floatingPasswordCustom"
                                        type="password"
                                        placeholder="Xác nhận lại mật khẩu"
                                        value={passwordS} onChange={(e) => setPassWordS(e.target.value)}
                                    />
                                </Form.Floating> */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={
                                    () => { handleChangePassWord() }}>Đổi mật khẩu</Button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div className="fixed-plugin"></div>
                </>
                : (window.location.href = "/")
            }

        </Fragment>
    )
}
export default Profile;