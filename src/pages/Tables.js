import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
function Tables() {
    const token = sessionStorage.getItem("token")
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/admin/Accounts')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const renderStatus = (item) => {
        if (item.status) {

            return (
                <div style={{ marginTop: "-18px", marginRight: "-9.5px" }} className="text-center text-sm">
                    <span className="badge badge-sm bg-gradient-success">
                        Hoạt động
                    </span></div>
            )
            // setEditStatus(true);
        }
        else {
            return (<div style={{ marginTop: "-18px" }} className="align-middle text-center text-sm">
                <span className="badge badge-sm bg-gradient-secondary">
                    Không hoạt động
                </span>
            </div>)
            // setEditStatus(false);
        }
    }
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
                            id="navbarBlzur"
                            data-scroll="false"
                        >
                            <div className="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">

                                    <h3 className="font-weight-bolder text-white mb-0">Danh sách tài khoản</h3>
                                </nav>
                                <div
                                    className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                                    id="navbar"
                                >
                                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                        <div className="input-group">
                                            {/* <span className="input-group-text text-body">
                                            <i className="fas fa-search" aria-hidden="true" />
                                        </span> */}
                                            {/* <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm kiếm ở đây..."
                                        /> */}
                                        </div>
                                    </div>
                                    {/* <ul className="navbar-nav  justify-content-end">
                                    <li className="nav-item d-flex align-items-center">
                                        <a
                                            href="javascript:;"
                                            className="nav-link text-white font-weight-bold px-0"
                                        >
                                            <i className="fa fa-user me-sm-1" />
                                            <span className="d-sm-inline d-none">Sign In</span>
                                        </a>
                                    </li>
                                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                        <a
                                            href="javascript:;"
                                            className="nav-link text-white p-0"
                                            id="iconNavbarSidenav"
                                        >
                                            <div className="sidenav-toggler-inner">
                                                <i className="sidenav-toggler-line bg-white" />
                                                <i className="sidenav-toggler-line bg-white" />
                                                <i className="sidenav-toggler-line bg-white" />
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item px-3 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white p-0">
                                            <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                        <a
                                            href="javascript:;"
                                            className="nav-link text-white p-0"
                                            id="dropdownMenuButton"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="fa fa-bell cursor-pointer" />
                                        </a>
                                        <ul
                                            className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <li className="mb-2">
                                                <a
                                                    className="dropdown-item border-radius-md"
                                                    href="javascript:;"
                                                >
                                                    <div className="d-flex py-1">
                                                        <div className="my-auto">
                                                            <img
                                                                src="../assets/img/team-2.jpg"
                                                                className="avatar avatar-sm  me-3 "
                                                            />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="text-sm font-weight-normal mb-1">
                                                                <span className="font-weight-bold">New message</span>{" "}
                                                                from Laur
                                                            </h6>
                                                            <p className="text-xs text-secondary mb-0">
                                                                <i className="fa fa-clock me-1" />
                                                                13 minutes ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="mb-2">
                                                <a
                                                    className="dropdown-item border-radius-md"
                                                    href="javascript:;"
                                                >
                                                    <div className="d-flex py-1">
                                                        <div className="my-auto">
                                                            <img
                                                                src="../assets/img/small-logos/logo-spotify.svg"
                                                                className="avatar avatar-sm bg-gradient-dark  me-3 "
                                                            />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="text-sm font-weight-normal mb-1">
                                                                <span className="font-weight-bold">New album</span> by
                                                                Travis Scott
                                                            </h6>
                                                            <p className="text-xs text-secondary mb-0">
                                                                <i className="fa fa-clock me-1" />1 day
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="dropdown-item border-radius-md"
                                                    href="javascript:;"
                                                >
                                                    <div className="d-flex py-1">
                                                        <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                                            <svg
                                                                width="12px"
                                                                height="12px"
                                                                viewBox="0 0 43 36"
                                                                version="1.1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            >
                                                                <title>credit-card</title>
                                                                <g
                                                                    stroke="none"
                                                                    strokeWidth={1}
                                                                    fill="none"
                                                                    fillRule="evenodd"
                                                                >
                                                                    <g
                                                                        transform="translate(-2169.000000, -745.000000)"
                                                                        fill="#FFFFFF"
                                                                        fillRule="nonzero"
                                                                    >
                                                                        <g transform="translate(1716.000000, 291.000000)">
                                                                            <g transform="translate(453.000000, 454.000000)">
                                                                                <path
                                                                                    className="color-background"
                                                                                    d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                                    opacity="0.593633743"
                                                                                />
                                                                                <path
                                                                                    className="color-background"
                                                                                    d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="text-sm font-weight-normal mb-1">
                                                                Payment successfully completed
                                                            </h6>
                                                            <p className="text-xs text-secondary mb-0">
                                                                <i className="fa fa-clock me-1" />2 days
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul> */}
                                </div>
                            </div>
                        </nav>
                        {/* End Navbar */}
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">

                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">
                                                <table className="table align-items-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ textAlign: "left" }} className="text-dark font-weight-bold opacity-7 ps-2">
                                                                Họ tên
                                                            </th>
                                                            <th className="text-center text-dark font-weight-bold opacity-7 ps-2">
                                                                Trạng thái
                                                            </th>
                                                            <th style={{ textAlign: "left" }} className=" text-dark font-weight-bold opacity-7 ps-2">
                                                                Số điện thoại
                                                            </th>
                                                            <th style={{ textAlign: "left" }} className="  text-dark font-weight-bold opacity-7 ps-2">
                                                                Email
                                                            </th>
                                                            <th style={{ textAlign: "left" }} className="text-dark font-weight-bold opacity-7 ps-2">
                                                                Địa chỉ
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data && data.length > 0 ?
                                                                data.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>

                                                                            <td>
                                                                                <div className="d-flex px-2 py-1">
                                                                                    <div>
                                                                                        <img

                                                                                            src={item.avatar}
                                                                                            className="avatar avatar-sm me-4"
                                                                                            alt="user1"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="d-flex flex-column justify-content-center">
                                                                                        <h6 className="mb-0 text-sm">{item.userName}</h6>
                                                                                        <p className="text-xs text-secondary mb-0 text-dark">
                                                                                            {item.fullName}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td > {renderStatus(item)}</td>
                                                                            <td style={{ textAlign: "left" }} className="text-dark font-weight-bold align-center">{item.phoneNumber}</td>
                                                                            <td style={{ textAlign: "left" }} className="text-dark font-weight-bold ">{item.email}</td>
                                                                            <td style={{ textAlign: "left" }} className="text-dark font-weight-bold ">{item.address1} / {item.address2}</td>



                                                                            {/* <td className="align-middle">
                                                                            <a
                                                                                href="javascript:;"
                                                                                className="text-secondary font-weight-bold text-xs"
                                                                                data-toggle="tooltip"
                                                                                data-original-title="Edit user"
                                                                            >
                                                                                Chỉnh sửa
                                                                            </a>
                                                                        </td> */}
                                                                        </tr>

                                                                    )

                                                                }) : "loading.."
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </main>
                    <div className="fixed-plugin"></div>
                </>
                : (window.location.href = "/")
            }
        </Fragment>
    )
}
export default Tables;