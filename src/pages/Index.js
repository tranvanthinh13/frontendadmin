import { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Index() {
    const token = sessionStorage.getItem("token")
    const usenavigate = useNavigate();
    const dangxuat = () => {
        sessionStorage.clear();
        usenavigate('/')
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/Banners/2')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    console.log("data:", data.image)
    return (
        <Fragment>
            {token ?
                <>

                    <div className="min-height-300 bg-primary position-absolute w-100" />
                    <Menu />
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


                                    </div>
                                </div>


                            </div>
                        </div>
                    </nav>
                    <main style={{
                        backgroundImage: `url(${data.image})`,
                        height: "100vh",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }} className="main-content position-relative border-radius-lg ">
                        {/* <img

                            src={data.image}

                        /> */}

                    </main>
                    <div className="fixed-plugin"></div>


                </>
                : window.location.href = "/"}
        </Fragment>
    )
}
export default Index;