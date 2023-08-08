
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
function Menu() {
    const token = sessionStorage.getItem("token")
    const usenavigate = useNavigate();
    const dangxuat = () => {
        if (window.confirm("Bạn có chắc muốn đăng xuát") === true) {
            sessionStorage.clear();
            usenavigate('/')
        } else {
            usenavigate('/Dashboard')
        }
    }
    return (

        <Fragment>
            {token ?
                <>
                    <aside
                        className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
                        id="sidenav-main"
                    >
                        <div className="sidenav-header">
                            <i
                                className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                                aria-hidden="true"
                                id="iconSidenav"
                            />
                            <Link
                                className="navbar-brand m-0"
                                to="/Index"
                                target="_blank"
                            >
                                <img
                                    src="../assets/img/logo-ct-dark.png"
                                    className="navbar-brand-img h-100"
                                    alt="main_logo"
                                />
                                <span> Admin</span>

                            </Link>
                        </div>
                        <hr className="horizontal dark mt-0" />
                        <div
                            className="collapse navbar-collapse  w-auto "
                            id="sidenav-collapse-main"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/Dashboard">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
                                        </div>

                                        <span className="nav-link-text ms-1">Thống Kê</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/Products2">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                                        </div>

                                        <span className="nav-link-text ms-1">Sản phẩm</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/Products">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                                        </div>

                                        <span className="nav-link-text ms-1">Thương hiệu</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/Promotion" >
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                                        </div>

                                        <span className="nav-link-text ms-1">Khuyến mãi</span>

                                    </Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link " to="/Invoice">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                                        </div>

                                        <span className="nav-link-text ms-1">Đơn hàng</span>

                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link " to="/ImportInvoices">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                                        </div>
                                        <span className="nav-link-text ms-1">Hoá đơn nhập</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/Tables">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                                        </div>


                                        <span className="nav-link-text ms-1">Tài khoản</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/Banner">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                                        </div>

                                        <span className="nav-link-text ms-1">Quảng cáo</span>
                                    </Link>
                                </li>




                                <li className="nav-item mt-3">
                                    <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                                        Tài Khoản cá Nhân
                                    </h6>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/Profile">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-single-02 text-dark text-sm opacity-10" />
                                        </div>

                                        <span className="nav-link-text ms-1">Thông tin</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link ">
                                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="ni ni-single-copy-04 text-warning text-sm opacity-10" />
                                        </div>
                                        <span onClick={() => dangxuat()}> Đăng xuất</span>
                                        {/* <span className="nav-link-text ms-1" onClick={() => dangxuat()}> Đăng Xuất</span> */}

                                    </a>
                                </li>

                            </ul>
                        </div>

                    </aside>
                </>



                : (window.location.href = "/")
            }
        </Fragment>
    )
}
export default Menu;