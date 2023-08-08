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
import { Input } from "@mui/material";
import { clear } from "@testing-library/user-event/dist/clear";

function ImportInvoices() {
    const token = sessionStorage.getItem("token")
    const [datatken, setDatatken] = useState([]);
    useEffect(() => {
        getDatatken();
    }, [])

    const getDatatken = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/admin/Accounts/GetUser', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setDatatken(result.data)
            })

            .catch((error) => {
                console.log(error)
            })
    }
    const params = useParams();
    const [datadetail, setDatadetail] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
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
    const [supplier, setSupplier] = useState('');
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [datacart, setDataCart] = useState([]);
    const [product, Setproduct] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(1)
    const [values, setValues] = useState([])
    const [options, setOptions] = useState()
    const currentDate = new Date();
    const [soluong, setsoluong] = useState()
    const [dongia, setdongia] = useState()
    const [valuemap, setValuesmap] = useState([])

    useEffect(() => {
        getData();
        getDataCart();

    }, [])
    useEffect(() => {

        fetch("https://localhost:7225/api/admin/Products").then((data) => data.json()).then((val) => setValues(val))

    }, [])

    const getDataCart = () => {
        const token = sessionStorage.getItem('token')
        if (token == null) {
            console.log("Cart null")
        } else {
            axios.get('https://localhost:7225/api/CartImports', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    setDataCart(result.data)
                    setCount(count + 1);
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
    const getData = () => {
        const token = sessionStorage.getItem('token')
        //let id = params.id;
        axios.get(`https://localhost:7225/api/admin/ImportInvoices`
        )
            .then((result) => {
                setData(result.data)
                setUser(result.data.applicationUser)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleEidt = (id) => {
        // alert(id)
        handleShow2();

        axios.get(`https://localhost:7225/api/admin/Invoices/${id}`
        )
            .then((result) => {
                setEditcode(result.data.code);
                seteditapplicationUser(result.data.applicationUserId);
                setEditshippingAddress(result.data.shippingAddress)
                setEditshippingPhone(result.data.shippingPhone)
                setEditissuedDate(result.data.issuedDate)
                setedittotal(result.data.total)
                setEditStatus(result.data.status);
                setEditId(id);
                if (result.data.status === 1) {
                    setStatusOptions([
                        { value: 1, name: 'Chờ xác nhận' },
                        { value: 2, name: 'Xác nhận' },
                        { value: 3, name: 'đang giao' },
                        { value: 4, name: 'đã giao' },
                        { value: 5, name: 'hoàn tất' },

                    ]);
                }
                else if (result.data.status === 2) {
                    setStatusOptions([
                        { value: 2, name: 'Xác nhận' },
                        { value: 3, name: 'đang giao' },
                        { value: 4, name: 'đã giao' },
                        { value: 5, name: 'hoàn tất' },
                    ]);
                }
                else if (result.data.status === 3) {
                    setStatusOptions([
                        { value: 3, name: 'đang giao' },
                        { value: 4, name: 'đã giao' },
                        { value: 5, name: 'hoàn tất' },

                    ]);
                }
                else {
                    setStatusOptions([
                        { value: 4, name: 'đã giao' },
                        { value: 5, name: 'hoàn tất' },

                    ]);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const clear = () => {
        setCount(0);
        setPrice('');
        setStock('');
    }
    const getDatadetail = (id) => {
        handleShow()
        console.log('objectid:', id)
        axios.get(`https://localhost:7225/api/admin/ImportInvoiceDetails/${id}`)
            .then((result) => {

                setDatadetail(result.data)
            })

            .catch((error) => {
                console.log(error)
            })
        console.log("datadatel:", datadetail)
    }

    const handleAddtoCart = (item) => {
        const token = sessionStorage.getItem('token')
        if (token === null) {
            toast.error('Vui lòng đăng nhập để sử dụng');
        }
        else {
            const url = 'https://localhost:7225/api/CartImports';
            const data1 = {
                "accountId": 1,
                "productId": item.id,
                "priceImport": price,
                "quantity": stock
            }

            //console.log('ok', token)
            //JSON.parse(sessionStorage.getItem('data')).data1.id;
            axios.post(url, data1, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(() => {
                    toast.success('Đã thêm một sản phẩm vào hóa đơn nhập');
                    getDataCart();
                    clear();
                }).catch((error) => {
                    toast.error('Thêm thất bại vui lòng kiểm tra lại số lượng và giá tiền ');
                })
        }
    }
    const handleSave = () => {
        if (datacart.length <= 0) {
            toast.error('Không có sản phẩm nào để tạo hóa đơn nhập vui lòng thêm sản phẩm');
        } else {
            const url = 'https://localhost:7225/api/admin/ImportInvoices';
            const data = {

                "code": currentDate.toISOString(),
                "applicationUserId": datatken.id,
                "applicationUser": null,
                "supplier": supplier,
                "issuedDate": moment(currentDate).format(),
                "total": 0,
                "status": true
            }
            console.log(("object:", data))
            axios.post(url, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    getData();
                    toast.success('Tạo hóa đơn nhập thành công');
                    handleClose2();
                }).catch((error) => {
                    toast.error(error);
                })
        }

    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const handleupdatequantitydecrease = (item) => {
        const url = `https://localhost:7225/api/CartImports/${item.id}`;
        const data = {
            "id": item.id,
            "accountId": item.accountId,
            "productId": item.productId,
            "priceImport": item.priceImport,
            "quantity": item.quantity + 1
        }
        axios.put(url, data)
            .then(() => {
                getDataCart()

            }).catch((error) => {
                toast.error(error);
            })
    }
    const handleupdatequantityincrease = (item) => {
        const url = `https://localhost:7225/api/CartImports/${item.id}`;
        const data = {
            "id": item.id,
            "accountId": item.accountId,
            "productId": item.productId,
            "product": item.product,
            "priceImport": item.priceImport,
            "quantity": item.quantity - 1
        }
        if (data.quantity <= 0) {
            handleDelect(data.id)
        } else {
            axios.put(url, data)
                .then(() => {
                    getDataCart();

                }).catch((error) => {
                    toast.error(error);
                })
        }

    }

    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm khỏi hóa đơn nhập") === true) {
            axios.delete(`https://localhost:7225/api/CartImports/${id}`)
                .then((result) => {
                    toast.success('Đã xóa sản phẩm khỏi hóa đơn nhập');
                    getDataCart();

                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    var tong = datacart.reduce((a, v) => a = a + (v.priceImport * v.quantity), 0)
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
                                    {/* <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                        <div className="input-group">
                                            <span className="input-group-text text-body">
                                                <i className="fas fa-search" aria-hidden="true" />
                                            </span>


                                        </div>

                                    </div> */}


                                </div>
                            </div>
                        </nav>
                        {/* End Navbar */}
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-header pb-0">
                                            <h6>Hoá đơn nhập</h6>
                                            <div className=" text-end">
                                                <a
                                                    className="btn bg-gradient-dark mb-0"
                                                    onClick={() => handleShow2()}
                                                >
                                                    <i className="fas fa-plus" />
                                                    &nbsp;&nbsp;Tạo hóa đơn nhập

                                                </a>
                                            </div>
                                        </div>

                                        <div className="card-body col-md-10 ms-7">
                                            <div className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">

                                                <label>
                                                    Chọn sản phẩm để tạo hóa đơn nhập
                                                </label>
                                                <select className="form-control"
                                                    onChange={(e) => {
                                                        setOptions(e.target.value)

                                                        const targetPromotion = values.filter(i => i.id == e.target.value)

                                                        setOptions(targetPromotion[0])
                                                        setValuesmap(targetPromotion[0])
                                                        console.log("options", valuemap)

                                                    }} >
                                                    <option value="">Nhấn để chọn</option>
                                                    {
                                                        values.map((type, i) =>
                                                            <option key={i} value={type.id}>
                                                                <div>{type.name}
                                                                </div>

                                                            </option>)
                                                    }
                                                </select>


                                                {options && (

                                                    <div className=" col-md-12">


                                                        <label
                                                            htmlFor="example-text-input"
                                                            className="form-control-label mt-3"
                                                        >
                                                            Sản phẩm:
                                                        </label>
                                                        <tr >
                                                            <td className="align-middle">
                                                                <img src={options.image} style={{ width: 180 }} />
                                                            </td>
                                                            <td>
                                                                <p className="h6 text-uppercase" > {options.name}</p>
                                                            </td>


                                                        </tr>
                                                        <div className="form-group mt-3">
                                                            <label
                                                                htmlFor="example-text-input"
                                                                className="form-control-label"
                                                            >
                                                                Giá tiền nhập:
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Nhập Giá tiền"
                                                                onChange={(e) => setPrice(e.target.value)}
                                                                value={price}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="example-text-input"
                                                                className="form-control-label"
                                                            >
                                                                Số lượng:
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Nhập số lượng"
                                                                value={stock}
                                                                onChange={(e) => setStock(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className=" text-end">
                                                            <button
                                                                className="btn bg-gradient-dark "
                                                                onClick={() => { handleAddtoCart(options) }}
                                                            >
                                                                Thêm vào hóa đơn nhập
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
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
                                                                Nhà cung cấp
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Ngày lập
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Tổng tiền
                                                            </th>
                                                            <th className="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                Chức Năng
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
                                                                            <td ><b>{item.applicationUser.fullName}</b></td>
                                                                            <td ><b>{item.supplier}</b></td>
                                                                            <td>{moment(item?.issuedDate).format('DD/MM/YYYY')}</td>
                                                                            {/* <td ><b>{item.total}</b></td> */}
                                                                            <td><b>{item.total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b></td>

                                                                            <Link
                                                                                className="btn text-green"
                                                                                to={`../ImportInvoicesdetail/${item.id}`}
                                                                            >
                                                                                <td>Chi tiết</td>
                                                                            </Link>


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
                                <Modal.Title>Tạo Hóa đơn nhập</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    datacart && datacart.length > 0 ?

                                        <div className="">
                                            <div className="card-body">
                                                <table className="table align-items-center mb-0">
                                                    <thead className="thead-dark">
                                                        <tr className="text-center">
                                                            <th>Ảnh</th>
                                                            <th>Sản phẩm</th>
                                                            <th>Giá</th>
                                                            <th>Số lượng</th>
                                                            <th>Tổng tiền</th>
                                                            <th>Xóa</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="align-middle">
                                                        {

                                                            datacart.map((item, Index) => {
                                                                return (

                                                                    <tr key={Index}>
                                                                        <td className="align-middle">
                                                                            <img src={item.product.image} style={{ width: 70 }} />{" "}

                                                                        </td>
                                                                        <td>{item.product.name}</td>
                                                                        <td className="align-middle">{VND.format((item.priceImport))}</td>
                                                                        <td className="align-middle">
                                                                            <div
                                                                                className="text-center"
                                                                                style={{ width: 100 }}
                                                                            >
                                                                                <div className="">

                                                                                    <button className="btn btn-primary " onClick={() => handleupdatequantitydecrease(item)}>
                                                                                        <i className="fa fa-plus" />
                                                                                    </button>
                                                                                </div>

                                                                                <label>{item.quantity}</label>
                                                                                <div className="">
                                                                                    <button className="btn btn-primary" onClick={() => handleupdatequantityincrease(item)}>
                                                                                        <i className="fa fa-minus" />
                                                                                    </button>

                                                                                </div>

                                                                            </div>
                                                                        </td>
                                                                        <td className="" >{VND.format(item.quantity * item.priceImport)}</td>
                                                                        <td className="">
                                                                            <button className="btn  btn-danger" onClick={() => handleDelect(item.id)}>
                                                                                <i className="fa fa-times" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })

                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-lg-4">


                                                <div className="p-30 mb-5">

                                                    <div className="pt-2">
                                                        <div className="d-flex justify-content-between mt-2">
                                                            <h5>Tổng tiền</h5>
                                                            <h5>{VND.format(tong)}</h5>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="example-text-input"
                                                        className="form-control-label"
                                                    >
                                                        Tên nhà cung cấp:
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Nhập tên tên nhà cung cấp"
                                                        onChange={(e) => setSupplier(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        :
                                        <div>
                                            <iframe src="https://embed.lottiefiles.com/animation/98909"></iframe>
                                        </div>
                                }


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="btn btn-block btn-primary" onClick={() => handleSave()}>
                                    Tạo hóa đơn nhập
                                </Button>
                                <Button variant="secondary" onClick={handleClose2}>
                                    Đóng
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

export default ImportInvoices
