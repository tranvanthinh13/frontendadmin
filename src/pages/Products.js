import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Menu from "./Menu";
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import Description from "../components/Description";
import ReactPaginate from "react-paginate";
import { type } from "@testing-library/user-event/dist/type";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function Products() {
    const API_URL = 'https://localhost:7225/api/ProductImages';
    const getProductsApiig = () => {
        return axios.get(API_URL);
    };
    const [getdatidimages, setdataimages] = useState('');
    const token = sessionStorage.getItem("token")
    const [image, setImage] = useState();
    const [name, setName] = useState('')
    const [sku, setSku] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [gpu, setgpu] = useState('')
    const [cpu, setcpu] = useState('')
    const [ram, setram] = useState('')
    const [hardDrive, sethardDrive] = useState('')
    const [screens, setScreens] = useState('')
    const [battery, setbattery] = useState('')
    const [size, setSize] = useState('')
    const [weight, setweight] = useState('')
    const [connector, setconnector] = useState('')
    const [otherUtilities, setotherUtilities] = useState('')
    const [promotion, setPromotion] = useState({})
    const [productId, SetproductId] = useState({})
    const [data, setData] = useState([]);

    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [results, setResults] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const [error, setError] = useState('');
    //const [name, setName] = useState('')
    const [productType, productTypeId] = useState('')
    const [status, setStatus] = useState(true)
    const [editID, setEditId] = useState('');
    const [editsku, setEditSku] = useState('');
    const [editname, setEditName] = useState('')
    const [editdescription, setEditDescription] = useState('');
    const [editprice, setEditPrice] = useState('');
    const [editstock, setEditStock] = useState('');
    const [editrating, setEditRating] = useState('');
    const [editproductTypeId, setEditProductTypeId] = useState('');
    const [editproductPromotionId, setEditProductPromotionId] = useState('');
    const [editgpu, setEditgpu] = useState('');
    const [editcpu, setEditcpu] = useState('');
    const [editram, seteditram] = useState('');
    const [edithardDrive, setedithardDrive] = useState('');
    const [editscreens, seteditscreens] = useState('');
    const [editbattery, seteditbattery] = useState('');
    const [editsize, seteditsize] = useState('');
    const [editweight, seteditweight] = useState('');
    const [editconnector, seteditconnector] = useState('');
    const [editotherUtilities, seteditotherUtilities] = useState('');
    const [editimage, setEditImage] = useState('');
    // const [editstatus, setEditStatus] = useState(true)
    const [values, setValues] = useState([])
    const [options, setOptions] = useState()

    const [valuespromotion, setValuespromotion] = useState([])
    const [optionspromotion, setOptionspromotion] = useState()
    const CLOUDINARY_URL = "cloudinary://188986446376245:b3L-nVDOEx0hxRld1X6qN0sRZ3I@dwkujomo6"
    const [Image1, setSelectedFile] = useState([]);
    // const [data, setData] = useState([]);
    const [datadetail, setDatadetail] = useState([]);
    const [data1, setData1] = useState([]);
    const [datapromotion, setDataPromotion] = useState([]);
    const [dataimpost, setDataImpost] = useState([]);
    const [dataproduct, setDataProduct] = useState([]);
    const [dataimg, setdatimg] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);
    // Lấy chỉ số sản phẩm đầu và cuối của trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProductType = data.slice(indexOfFirstProduct, indexOfLastProduct);
    const [editnew, Seteditnew] = useState(true)
    const renderStatus = (item) => {
        if (item) {
            return (
                <label>
                    Sản phẩm:<b style={{ color: "#22A699", paddingLeft: "5px" }}>Mới</b>
                </label>
            )
            // setEditStatus(true);
        }
        else {
            return (<div >
                {" "}
            </div>)
            // setEditStatus(false);
        }
    }
    const renderStatusprodut = (item) => {
        if (item) {
            return (
                <label>
                    Trạng thái:<b style={{ color: "#22A699", paddingLeft: "5px" }}>Còn kinh doanh</b>
                </label>
            )
            // setEditStatus(true);
        }
        else {
            return (<label>
                Trạng thái:<b style={{ color: "red", paddingLeft: "5px" }}>Ngừng kinh doanh</b>
            </label>
            )
            // setEditStatus(false);
        }
    }
    const renderStatushot = (item) => {
        if (item) {
            return (
                <label>
                    Sản phẩm bán có doanh thu: <b style={{ color: "#22A699" }}>Cao</b>
                </label>
            )
            // setEditStatus(true);
        }
        else {
            return (<div >
                Sản phẩm bán có doanh thu: <b style={{ color: "#F29727" }}>Bình thường</b>
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
    const [edithot, Setedithot] = useState(true)
    const handleEdithotChange = (e) => {
        if (e.target.checked) {
            Setedithot(true);
        }
        else {
            Setedithot(false);
        }
    }
    // Chuyển đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        getData();
        fetch("https://localhost:7225/api/admin/ProductPromotions/true").then((data) => data.json()).then((val) => setValuespromotion(val))

        fetch("https://localhost:7225/api/admin/ProductTypes").then((data) => data.json()).then((val) => setValues(val))

    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/admin/Products')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getData2 = (id) => {
        handleShow3();
        axios.get(`https://localhost:7225/api/admin/Products/${id}`)
            .then((result) => {
                setData1(result.data)
                setDataPromotion(result.data.productPromotion)
                if (result.data.productPromotion.status == false) {
                    setDataPromotion(datapromotion.percent == 0)
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const getInpost = (id) => {
        handleShow3();
        axios.get(`https://localhost:7225/api/admin/ImportInvoiceDetails/product?id=${id}`)
            .then((result) => {
                setDataImpost(result.data)
                console.log(result.data)
                setDataProduct(result.data.product)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const urlimg = "https://localhost:7225/images/";
    const getDataimg = (id) => {
        console.log('id', id)
        handleShow3();
        axios.get(`https://localhost:7225/api/ProductImages/api/productimages/${id}`)
            .then((result) => {
                setdatimg(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // set lideshow
    const [currentIndex, setCurrentIndex] = useState(1);
    const goToPreviousSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + dataimg.length) % dataimg.length);
    };

    const goToNextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % dataimg.length);
    };
    const handleEidt = (id) => {
        handleShow2();
        axios.get(`https://localhost:7225/api/admin/Products/${id}`)
            .then((result) => {
                setEditId(id);
                setEditSku(result.data.sku);
                setEditName(result.data.name);
                setEditDescription(result.data.description)
                setEditPrice(result.data.price);
                setEditStock(result.data.stock)
                setEditRating(result.data.rating);
                // setEditStatus(result.data.status);
                setEditProductTypeId(result.data.productType.id)
                setEditProductPromotionId(result.data.productPromotion.id)
                setEditgpu(result.data.gpu);
                setEditcpu(result.data.cpu);
                seteditram(result.data.ram);
                setedithardDrive(result.data.hardDrive);
                seteditscreens(result.data.screens);
                seteditbattery(result.data.battery);
                seteditsize(result.data.size);
                seteditweight(result.data.weight);
                seteditconnector(result.data.connector)
                seteditotherUtilities(result.data.otherUtilities);
                setEditImage(result.data.image);
                setOptions(result.data.productType.id)
                setPromotion(result.data.productPromotion)
                Seteditnew(result.data.productNew);
                Setedithot(result.data.productHot)
                setdataimages(id)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm") == true) {
            axios.delete(`https://localhost:7225/api/admin/Products/${id}`)
                .then((result) => {
                    toast.success('Đã ngừng kinh doang sản phẩm');
                    getData();
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleUpdate = async (event) => {
        setdataimages(editID)
        let Imagepath = ''
        const formdata = new FormData()
        if (editimage) {
            formdata.append('file', editimage)
            formdata.append('upload_preset', 'fupnsnco')

            const res = await fetch(`https://api.cloudinary.com/v1_1/dwkujomo6/image/upload`, {
                method: 'POST',
                body: formdata
            })
            const data = await res.json()
            Imagepath = data.secure_url
            const url = `https://localhost:7225/api/admin/Products/${editID}`;
            const from = {
                "id": editID,
                "sku": editsku,
                "name": editname,
                "description": editdescription,
                "price": editprice,
                "stock": editstock,
                "rating": editrating,
                "productTypeId": options,
                "productType": null,
                "productPromotionId": optionspromotion,
                "productPromotion": null,
                "image": Imagepath,
                "status": true,
                "gpu": editgpu,
                "cpu": editcpu,
                "ram": editram,
                "hardDrive": edithardDrive,
                "screens": editscreens,
                "battery": editbattery,
                "size": editsize,
                "weight": editweight,
                "connector": editconnector,
                "otherUtilities": editotherUtilities,
                "productHot": edithot,
                "productNew": editnew
            }

            axios.put(url, from)
                .then((result) => {
                    getData();
                    handleSubmitimage1();
                    clear();
                    handleClose2();
                    toast.success('Sửa sản phẩm thành công');
                }).catch((error) => {

                    toast.error(error);
                })
        } else {
            const url = `https://localhost:7225/api/admin/Products/${editID}`;
            const from = {
                "id": editID,
                "sku": editsku,
                "name": editname,
                "description": editdescription,
                "price": editprice,
                "stock": editstock,
                "rating": editrating,
                "productTypeId": options,
                "productType": null,
                "productPromotionId": optionspromotion,
                "productPromotion": null,
                "image": editimage,
                "status": true,
                "gpu": editgpu,
                "cpu": editcpu,
                "ram": editram,
                "hardDrive": edithardDrive,
                "screens": editscreens,
                "battery": editbattery,
                "size": editsize,
                "weight": editweight,
                "connector": editconnector,
                "otherUtilities": editotherUtilities,
                "productHot": true,
                "productNew": editnew
            }

            axios.put(url, from)
                .then((result) => {
                    getData();
                    clear();
                    handleClose2();
                    toast.success('Sửa sản phẩm thành công');
                }).catch((error) => {

                    toast.error(error);
                })
        }
    }

    const clear = () => {

        setSku('');
        setName('');
        setDescription('');
        setPrice('');
        // setStock('');
        setgpu('');
        setcpu('');
        setram('');
        setScreens('')
        sethardDrive('');
        setbattery('');
        setSize('');
        setweight('');
        setconnector('');
        setotherUtilities('');

        setName('');
        setStatus(0);
        setEditName('');
        // setEditStatus(0);
        setEditId('');
        setEditName('');
        setEditDescription('')
        setEditPrice('');
        setEditStock('');
        //setEditProductTypeId('')
        setEditProductPromotionId('');
        setEditImage('')
        setEditgpu('')
        setEditcpu('');
        seteditram('');
        setedithardDrive('');
        seteditscreens('');
        seteditbattery('');
        seteditsize('');
        seteditweight('');
        seteditconnector('');
        seteditotherUtilities('');
        setSelectedFile([''])
    }
    const handleStatusChange = (e) => {
        if (e.target.checked) {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    }






    const submitImage = async (event) => {

        if (name.trim() === '') {
            toast.error("Tên sản phẩm không được để trống");
            return;
        }

        if (price.trim() === '') {
            toast.error("giá không đươc để trống")
            return;
        }

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
            const currentSKU = new Date()
            const url = 'https://localhost:7225/api/admin/Products';
            const form = {

                "sku": currentSKU.toISOString(),
                "name": name,
                "description": description,
                "price": price,
                "stock": 0,
                "rating": 0,
                "productTypeId": options,
                "productType": null,
                "productPromotionId": optionspromotion,
                "productPromotion": null,
                "image": Imagepath,
                "status": true,
                "productHot": false,
                "productNew": false,
                "gpu": gpu,
                "cpu": cpu,
                "ram": ram,
                "hardDrive": hardDrive,
                "screens": screens,
                "battery": battery,
                "size": size,
                "weight": weight,
                "connector": connector,
                "otherUtilities": otherUtilities,
                "productHot": false,
                "productNew": true
            }
            const token = sessionStorage.getItem('token')
            console.log('dtaa', form)
            axios.post(url, form, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    getData();
                    handleSubmitimage1();
                    clear();
                    handleClose();
                    toast.success('Đã thêm sản phẩm');
                }).catch((error) => {
                    toast.error(error);
                })
        }
    };

    const handleSubmitimage1 = async (event) => {
        console.log('data', getdatidimages)

        // Kiểm tra xem đã chọn ảnh hay chưa
        if (!Image1) {
            alert('Bạn chưa chọn ảnh');
            return;
        }

        try {
            for (let i = 0; i < Image1.length; i++) {

                const file = Image1[i];
                // Thực hiện xử lý tệp tin ở đây
                console.log(file.name);
                const formData = new FormData();
                formData.append('image', file);
                formData.append('productId', getdatidimages);
                formData.append("imagepath", file.name);

                // Gửi POST request với Axios hoặc fetch
                const response = await fetch("https://localhost:7225/api/ProductImages", {
                    method: 'POST',
                    body: formData,
                });

                // Kiểm tra tình trạng phản hồi từ server
            }
            setSelectedFile([''])

            // Tạo FormData để gửi dữ liệu ảnh lên server

        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra');
            // Xử lý lỗi
        }
    };




    //search
    const paddingadd = { paddingTop: '10px' }
    const [searchQuery, setSearchQuery] = useState(null);
    const [search, setSearch] = useState([]);
    useEffect(() => {
        getSearch();
    }, [searchQuery])
    const getSearch = () => {
        if (!searchQuery) {
            setSearch(null);
        } else {
            axios
                .get(`https://localhost:7225/api/Home/GetProductHome?search=${searchQuery}`)
                .then((result) => {
                    setSearch(result.data);
                    if (result.data.length == 0) {
                    } else {
                        if (result.status === 200) {
                            //toast.success("Có " + result.data.length + " sản phẩm");
                        }
                    }
                    // const currentURL = new URL(window.location.href);
                    // const newURL = new URL(currentURL);
                    // newURL.searchParams.delete('poscats');
                    // window.history.pushState(newURL.toString());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleSubmitsearch = (event) => {
        event.preventDefault();
        const result = getSearch(searchQuery);
        if (result) {
            search.map((item) => {
                return (
                    <div className="hot-deal-active col-lg-4 col-md-4 col-sm-6 col-6">
                        <div className="single-product">
                            <div className="pro-content">
                                <div className="pro-info">
                                    <h4>
                                        <a >{item.name}</a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };
    // useEffect(() => {

    // },
    //     [optionspromotion])

    const handleFileSelect = (event) => {

        setSelectedFile(event.target.files)
    }
    return (

        <Fragment>
            {
                token ?
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

                                            <div className="input-group" style={{
                                                position: "relative",
                                                width: "600px",
                                                zIndex: "10"
                                            }}>

                                                {/* <span className="input-group-text text-body">
                                                    <i className="fas fa-search" aria-hidden="true" />
                                                </span> */}
                                                <input
                                                    type="text"
                                                    className=" fas fa-search form-control"
                                                    placeholder="Tìm kiếm ở đây..."
                                                    style={{
                                                        borderRadius: "5px",
                                                        marginRight: "-201px ",
                                                        marginLeft: "199px"
                                                    }}
                                                    value={searchQuery}
                                                    onChange={(e) => {
                                                        setSearchQuery(e.target.value);

                                                    }}
                                                    autoComplete="off"
                                                    onSubmit={handleSubmitsearch}
                                                // onBlur={() => {
                                                //     setSearch([])
                                                // }}
                                                />

                                                <ul style={{

                                                    background: "none 0px 0px repeat scroll white",
                                                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 9.3px 0.7px",
                                                    left: "auto",
                                                    padding: "0px",
                                                    width: "100%",
                                                    position: "absolute",
                                                    top: "100%",
                                                    maxHeight: "500px",
                                                    overflow: "auto",
                                                    marginLeft: "200px"

                                                }}>
                                                    <li style={{
                                                        position: "relative",
                                                        color: "rgb(51, 51, 51)",
                                                        display: "block",
                                                        fontSize: "15px",
                                                        fontWeight: "700",
                                                        /* padding: 10px 15px; */
                                                        textTransform: "capitalize",
                                                        fontFamily: "Lato, sans-serif"
                                                    }}>
                                                        {search && search.length > 0
                                                            ? search.map((item) => {
                                                                return (
                                                                    <div style={{ marginBottom: "18px", overflow: "hidden", position: "relative" }}>
                                                                        <td>  <img
                                                                            style={{ weiht: "100px", height: "70px" }}
                                                                            src={item.image}
                                                                            className=""
                                                                        /></td>
                                                                        <div style={{
                                                                            marginLeft: "174px",
                                                                            marginTop: "-78px",
                                                                            float: "left",
                                                                            padding: "0px 15px 15px 0px",
                                                                            width: "41%",
                                                                            textAlign: "justify",

                                                                        }}>
                                                                            <a onClick={() => {

                                                                                getData2(item.id);
                                                                            }
                                                                            } >{item.name}</a>
                                                                            <h5 style={{ color: "red" }}>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5>

                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                            : ""}
                                                    </li>
                                                </ul>
                                            </div>



                                            <div className="col-6 text-end">
                                                <a
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
                            <div style={{ position: "relative" }} className="container-fluid py-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="card-header pb-0">
                                                <h6>Sản phẩm</h6>
                                            </div>
                                            <div className="card-body px-0 pt-0 pb-2">
                                                <div className="table-responsive p-0">
                                                    <table className="table align-items-center mb-0">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th style={{ textAlign: 'center' }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Ảnh
                                                                </th>
                                                                <th style={{ textAlign: 'center' }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Tên sản phẩm (nhấn xem chi tiết)
                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                                    Thông tin sản phẩm
                                                                </th>
                                                                {/* <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                            Trạng thái
                                                        </th> */}
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                                    Giá
                                                                </th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                                    Số lượng
                                                                </th>
                                                                {/* <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                            Đánh giá sao
                                                        </th> */}
                                                                {/* <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                            Loại Sản Phẩm
                                                        </th> */}

                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                                    Chức năng
                                                                </th>



                                                            </tr>
                                                        </thead>
                                                        <tbody>



                                                            {
                                                                data && data.length > 0 ?
                                                                    currentProductType.map((item, index) => {
                                                                        return (
                                                                            <tr key={index} className="text-center">
                                                                                <td>  <img
                                                                                    style={{ weiht: "220px", height: "128px" }}
                                                                                    src={item.image}
                                                                                    className=""
                                                                                /></td>
                                                                                <a
                                                                                    className="btn btn-link text-dark px-3 mb-0"
                                                                                    onClick={() => {
                                                                                        getDataimg(item.id);
                                                                                        getData2(item.id);
                                                                                        getInpost(item.id);
                                                                                    }}>
                                                                                    <td className="description">{item.name}</td>
                                                                                </a>
                                                                                <td style={{ textAlign: "justify" }} className="description">
                                                                                    {<Description data={item.description} />}

                                                                                </td>
                                                                                <td><h5 style={{ color: "red" }}>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</h5></td>


                                                                                <td className="text-center">{item.stock}</td>
                                                                                {/* <td>{item.rating}</td> */}
                                                                                {/* <td>{item.productType.name}</td> */}

                                                                                <td colSpan={2} className="text-center">
                                                                                    <div className="me-4">
                                                                                        <a
                                                                                            className="btn btn-link text-dark  "
                                                                                            onClick={() => handleEidt(item.id)}

                                                                                        >
                                                                                            <i
                                                                                                className="fas fa-pencil-alt text-dark"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                            Sửa
                                                                                        </a>


                                                                                    </div>


                                                                                </td>
                                                                                <td><a
                                                                                    className="btn btn-link text-danger text-gradient px-3 mb-0"
                                                                                    onClick={() => handleDelect(item.id)}
                                                                                >
                                                                                    <i className="far fa-trash-alt me-2" />
                                                                                    Xoá
                                                                                </a></td>


                                                                            </tr>
                                                                        )
                                                                    })
                                                                    : <div>
                                                                        <iframe src="https://embed.lottiefiles.com/animation/98909"></iframe>
                                                                    </div>
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div style={{ textAlign: "center", paddingLeft: "45%" }} className="pagination">
                                                    {currentPage > 1 && (
                                                        <button className="pagination-button" onClick={() => paginate(currentPage - 1)}>
                                                            Quay lại
                                                        </button>
                                                    )}
                                                    {Array.from({ length: Math.ceil(data.length / productsPerPage) }).map((_, index) => (
                                                        <button key={index} onClick={() => paginate(index + 1)} className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}>
                                                            {index + 1}
                                                        </button>
                                                    ))}
                                                    {currentPage < Math.ceil(data.length / productsPerPage) && (
                                                        <button className="pagination-button" onClick={() => paginate(currentPage + 1)}>
                                                            Tiếp theo
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Thêm sản phẩm tại đây</Modal.Title>
                                    <button className="btn-close" aria-hidden="true">x</button>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">

                                        <div className=" col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Chọn loại sản phẩm:
                                                </label>
                                                <select className="form-control"
                                                    onChange={(e) => {
                                                        setOptions(e.target.value)

                                                    }} >
                                                    <option value="">Nhấn để chọn</option>
                                                    {
                                                        values.map((type, i) => <option key={i} value={type.id}>{type.name}</option>)
                                                    }
                                                </select>

                                            </div>
                                        </div>


                                        <div className=" col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Tên sản phẩm:
                                                </label>
                                                <textarea

                                                    rows={2}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập tên sản phẩm"
                                                    value={name} onChange={(e) => setName(e.target.value)}
                                                />
                                                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
                                            </div>
                                        </div>
                                        <div className=" col-md-13">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ảnh đại diện:
                                            </label>
                                            <input className="form-control" type="file" onChange={(e) => {

                                                setImage(e.target.files[0])
                                            }} />

                                        </div>
                                        <div className="col-md-13">

                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >Danh sách ảnh:</label>

                                            <input className="form-control" type="file" onChange={handleFileSelect} multiple />
                                        </div>

                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Thông tin chi tiết:
                                                </label>

                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={description}

                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setDescription(data);
                                                        console.log({ event, editor, data });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    GPU:
                                                </label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Nhập thông tin của GPU"
                                                    value={gpu} onChange={(e) => setgpu(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    CPU:
                                                </label>
                                                <textarea

                                                    rows={4}
                                                    className="form-control"
                                                    placeholder="Nhập thông tin của CPU"
                                                    value={cpu} onChange={(e) => setcpu(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Ram:
                                                </label>
                                                <textarea

                                                    rows={4}
                                                    className="form-control"
                                                    placeholder="Nhập thông tin của ram"
                                                    value={ram} onChange={(e) => setram(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Ổ cứng:
                                                </label>
                                                <textarea

                                                    rows={4}
                                                    className="form-control"
                                                    placeholder="Nhập thông tin của ổ cứng"
                                                    value={hardDrive} onChange={(e) => sethardDrive(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Màn hình:
                                                </label>
                                                <textarea

                                                    rows={4}
                                                    className="form-control"
                                                    placeholder="Nhập thông tin của màn hình"
                                                    value={screens} onChange={(e) => setScreens(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Pin:
                                                </label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Nhập thông tin của pin"
                                                    value={battery} onChange={(e) => setbattery(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Kích thước:
                                                </label>
                                                <textarea

                                                    rows={2}
                                                    className="form-control"
                                                    placeholder="Nhập thông tin kích thước"
                                                    value={size} onChange={(e) => setSize(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Trọng lượng:
                                                </label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Nhập thông tin trọng lượng"
                                                    value={weight} onChange={(e) => setweight(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Kết nối:
                                                </label>
                                                <textarea

                                                    rows={3}
                                                    className="form-control"
                                                    placeholder="Nhập thông tin các cổng kết nối"
                                                    value={connector} onChange={(e) => setconnector(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Tiện ích:
                                                </label>
                                                <textarea

                                                    rows={3}
                                                    className="form-control"
                                                    placeholder="Nhập thông tin tiện ích"
                                                    value={otherUtilities} onChange={(e) => setotherUtilities(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Giá tiền:
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Nhập  Giá tiền"
                                                    value={price} onChange={(e) => setPrice(e.target.value)}

                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-13">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Chọn đợt khuyến mãi:
                                                </label>
                                                <select className="form-control"
                                                    onChange={(e) => {
                                                        setOptionspromotion(e.target.value)
                                                        const targetPromotion = valuespromotion.filter(i => i.id == e.target.value)

                                                        setPromotion(targetPromotion[0])
                                                    }} >

                                                    {
                                                        valuespromotion.map((type, i) => <option key={i} value={type.id}>{type.promotionName}</option>)
                                                    }
                                                </select>

                                            </div>
                                            {promotion && (
                                                <div className="card-body px-0 pt-0 pb-2">
                                                    <div className="table-responsive p-0">
                                                        <div className="row">


                                                            <div className=" col-md-4">
                                                                <div className="form-group">
                                                                    <label
                                                                        htmlFor="example-text-input"
                                                                        className="form-control-label"
                                                                    >
                                                                        Giảm(%):
                                                                    </label>
                                                                    <p className="form-control">{promotion?.description}</p>
                                                                </div>
                                                            </div>
                                                            <div className=" col-md-4">
                                                                <div className="form-group">
                                                                    <label
                                                                        htmlFor="example-text-input"
                                                                        className="form-control-label"
                                                                    >
                                                                        Ngày bắt đầu:
                                                                    </label>
                                                                    <p className="form-control">{moment(promotion?.issuedDate).format('DD/MM/YYYY')}</p>
                                                                </div>
                                                            </div>
                                                            <div className=" col-md-4">
                                                                <div className="form-group">
                                                                    <label
                                                                        htmlFor="example-text-input"
                                                                        className="form-control-label"
                                                                    >
                                                                        Ngày kết thúc:
                                                                    </label>
                                                                    <p className="form-control">{moment(promotion?.expirationDate).format('DD/MM/YYYY')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>




                                                </div>
                                            )}
                                        </div>

                                        <button style={{ marginLeft: "15px", width: "96.5%", height: "30px" }} className="col-7 btn btn-primary btn-sm " onClick={
                                            () => {
                                                submitImage();

                                            }}>Thêm
                                        </button>

                                    </div>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Đóng
                                    </Button>

                                </Modal.Footer>
                            </Modal>
                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Chỉnh Sửa
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row" style={{ marginLeft: '63px' }}>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Chọn loại sản phẩm:
                                                </label>
                                                <select className="form-control"
                                                    onChange={(e) => {
                                                        setOptions(e.target.value)

                                                    }} >

                                                    {
                                                        values.map((type, i) => (
                                                            <option
                                                                key={i}
                                                                value={type.id}
                                                                selected={type.id == editproductTypeId ? true : false}
                                                            >
                                                                {type.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>

                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Mã sản phẩm:
                                                </label>
                                                <input
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập Mã sản phẩm"
                                                    value={editsku} onChange={(e) => {
                                                        setEditSku(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Tên sản phẩm:
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập tên sản phẩm"
                                                    value={editname} onChange={(e) => setEditName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ảnh đại diện:
                                            </label>
                                            <input className="form-control input-lg" type="file" onChange={(e) => {
                                                setEditImage(e.target.files[0])
                                            }} />

                                        </div>
                                        <div className="col-md-11">

                                            <label htmlFor="example-text-input"
                                                className="form-control-label">Thêm danh sách ảnh:</label>

                                            <div><input className="form-control input-lg" type="file" onChange={handleFileSelect} multiple /></div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Thông tin chi tiết:
                                                </label>

                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={editdescription}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setEditDescription(data);
                                                        console.log({ event, editor, data });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    GPU:
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editgpu} onChange={(e) => setEditgpu(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    CPU:
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editcpu} onChange={(e) => setEditcpu(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    RAM:
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editram} onChange={(e) => seteditram(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Ổ cứng:
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={edithardDrive} onChange={(e) => setedithardDrive(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Màn hình:
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editscreens} onChange={(e) => seteditscreens(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Pin:
                                                </label>
                                                <input

                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editbattery} onChange={(e) => seteditbattery(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Kích thước:
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editsize} onChange={(e) => seteditsize(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Trọng lượng:
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editweight} onChange={(e) => seteditweight(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Các cổng hỗ trợ:
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editconnector} onChange={(e) => seteditconnector(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Kết nối:
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editotherUtilities} onChange={(e) => seteditotherUtilities(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Giá tiền:
                                                </label>
                                                <input
                                                    className="form-control input-lg"
                                                    type="text" placeholder="Nhập thông tin chỉnh sửa"
                                                    value={editprice} onChange={(e) => setEditPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>


                                        <div className=" col-md-11">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Chọn đợt khuyến mãi:
                                                </label>

                                                <select className="form-control"
                                                    onChange={(e) => {
                                                        setOptionspromotion(e.target.value)
                                                        const targetPromotion = valuespromotion.filter(i => i.id == e.target.value)

                                                        setPromotion(targetPromotion[0])
                                                    }} >
                                                    {
                                                        valuespromotion.map((type, i) => (
                                                            <option
                                                                key={i}
                                                                value={type.id}
                                                                selected={type.id == editproductPromotionId ? true : false}
                                                            >
                                                                {type.promotionName}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                {promotion && (
                                                    <div className="card-body px-0 pt-0 pb-2">
                                                        <div className="table-responsive p-0">
                                                            <div className="row">


                                                                <div className=" col-md-4">
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="example-text-input"
                                                                            className="form-control-label"
                                                                        >
                                                                            Giảm(%):
                                                                        </label>
                                                                        <p className="form-control">{promotion?.description}</p>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-md-4">
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="example-text-input"
                                                                            className="form-control-label"
                                                                        >
                                                                            Ngày bắt đầu:
                                                                        </label>
                                                                        <p className="form-control">{moment(promotion?.issuedDate).format('DD/MM/YYYY')}</p>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-md-4">
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="example-text-input"
                                                                            className="form-control-label"
                                                                        >
                                                                            Ngày kết thúc:
                                                                        </label>
                                                                        <p className="form-control">{moment(promotion?.expirationDate).format('DD/MM/YYYY')}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=" col-md-11">
                                                            <div className="form-group">
                                                                <label
                                                                    htmlFor="example-text-input"
                                                                    className="form-control-label"
                                                                >
                                                                    Sản phẩm mới:
                                                                </label>
                                                                <input style={{ marginLeft: "55px" }} type="checkbox"
                                                                    checked={editnew === true ? true : false}
                                                                    onChange={(e) => handleEditStatusChange(e)} value={editnew}
                                                                />
                                                                <label>Còn hiệu lực</label>

                                                            </div>
                                                        </div>
                                                        <div className=" col-md-11">
                                                            <div className="form-group">
                                                                <label
                                                                    htmlFor="example-text-input"
                                                                    className="form-control-label"
                                                                >
                                                                    Sản phẩm bán chạy:
                                                                </label>
                                                                <input style={{ marginLeft: "20px" }} type="checkbox"
                                                                    checked={edithot === true ? true : false}
                                                                    onChange={(e) => handleEdithotChange(e)} value={edithot}
                                                                />
                                                                <label>Còn hiệu lực</label>

                                                            </div>
                                                        </div>



                                                    </div>
                                                )}
                                            </div>




                                        </div>
                                    </div>


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose2}>
                                        Đóng
                                    </Button>
                                    <Button variant="primary" onClick={() => {
                                        handleUpdate();

                                    }}>
                                        Cập nhật
                                    </Button>

                                </Modal.Footer>
                            </Modal>


                            <Modal show={show3} onHide={handleClose3}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Chi tiết sản phẩm

                                    </Modal.Title>

                                </Modal.Header>
                                <div className="row">
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Tên sản phẩm:
                                            </label>
                                            <label style={{ textAlign: "center" }} className="form-control"><b>{data1.name}</b></label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Hình ảnh:
                                            </label>
                                            <img
                                                style={{ weiht: "auto", height: "auto" }}
                                                src={data1.image}
                                                className="form-control"
                                            />

                                        </div>
                                    </div>



                                    <div style={{ marginLeft: '40px' }} className="col-md-11">
                                        <div className="form-control d-flexs">
                                            {dataimg.map((item, index) => (
                                                <img className="m-2"
                                                    style={{ marginLeft: '10px', weiht: "100px", height: "100px" }} src={urlimg + item.imagepath} />

                                            ))}
                                        </div>




                                    </div>




                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Mã sản phẩm:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.sku}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            {renderStatus(data1.productNew)}


                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            {renderStatusprodut(data1.status)}


                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            {renderStatushot(data1.productHot)}


                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Loại sản phẩm:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.productType?.name}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                GPU:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.gpu}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                CPU:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.cpu}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                RAM:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.ram}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ổ cứng:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.hardDrive}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Màn hình:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.screens}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Pin:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.battery}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Kích thước:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.size}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Trọng lượng:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.weight}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Các kết nối:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.connector}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Hỗ trợ
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.otherUtilities}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Giá bán:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control"><b>{data1.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b></label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Giá sao khi giảm giá:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control"><b>{(data1.pricePromotion)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b></label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Giá nhập:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control"><b>{dataimpost.unitPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b></label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Đợt giảm giá:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.productPromotion?.promotionName}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Giảm giá:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.productPromotion?.description}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ngày bắt đầu giảm giá:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{moment(data1.productPromotion?.issuedDate).format('DD/MM/YYYY')}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Ngày kết thúc giảm giá:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{moment(data1.productPromotion?.expirationDate).format('DD/MM/YYYY')}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Số sao đánh giá:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.rating}</label>

                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '40px' }} className=" col-md-11">
                                        <div className="form-group">
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Số lượng:
                                            </label>
                                            <label style={{ textAlign: "left" }} className="form-control">{data1.stock}</label>

                                        </div>
                                    </div>


                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose3}>
                                        Đóng
                                    </Button>

                                </Modal.Footer>
                            </Modal>
                        </main>
                        <div className="fixed-plugin"></div>
                    </>
                    : (window.location.href = "/")
            }
        </Fragment >

    )






}
export default Products;








