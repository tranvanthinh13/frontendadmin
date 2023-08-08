import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from '../Forms/SignupForm';
import { CloudinaryContext } from "cloudinary-react";
function Sign_in() {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            fetch("https://localhost:7225/Authenticate/login/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                //console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Tên đăng nhập không được để trống');
                } else {
                    if (resp.password === password) {
                        // toast.success('Thành công');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('token', resp.token);
                        usenavigate('/')
                    } else {
                        toast.error('Mật khẩu không đúng! Vui lòng nhập lại');
                    }
                }
            }).catch((err) => {
                toast.error('Lỗi kết nối');
            });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');


            let inputobj = {
                "username": username,
                "password": password
            };
            fetch("https://localhost:7225/Authenticate/login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (resp.status === 401) {
                    toast.error('Đăng nhập thất bại, vui lòng thử lại!');
                }
                else if (resp.userRoles[0] !== 'Admin') {
                    toast.error('Đây không phải tài khoản người quản trị, vui lòng nhập lại!');
                }
                else {
                    toast.success('Thành công');
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('token', resp.token);
                    usenavigate('/Dashboard')
                }

            }).catch((err) => {
                toast.error('Đăng nhập thất bại :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Vui lòng nhập tên');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Nhập mật khẩu');
        }
        return result;
    }

    return (
        <Fragment>
            <ToastContainer />
            <>
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3 navbar-transparent mt-4">
                    <div className="container">

                        <img
                            src="./assets/img/logo-ct-dark.png"
                            className="navbar-brand-img h-100"
                            alt="main_logo"
                        />
                        <div className="collapse navbar-collapse" id="navigation">
                            <ul className="navbar-nav mx-auto">

                            </ul>

                        </div>
                    </div>
                </nav>

                <main className="main-content  mt-0">
                    <div
                        className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
                        style={{
                            backgroundImage: 'url("../assets/img/1.2.jpg")',
                            backgroundPosition: "center-center"
                        }}
                    >
                        <span className="mask bg-gradient-dark opacity-6" />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5 text-center mx-auto">
                                    <h1 className="text-white mb-2 mt-5">Xin chào</h1>
                                    {/* <p className="text-lead text-white">
                                        Use these awesome forms to login or create new account in your
                                        project for free.
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
                            <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                                <div className="card z-index-0">
                                    <div className="card-header text-center pt-4">
                                        <h5>Đăng Nhập</h5>
                                    </div>
                                    <div className="row px-xl-5 px-sm-4 px-3">
                                        <div className="col-3 ms-auto px-1">
                                            <img
                                                style={{ width: "48px", height: "45px" }}
                                                src="./assets/img/logo-ct-dark.png"
                                                className="navbar-brand-img h-100"
                                                alt="main_logo"
                                            />
                                        </div>

                                        <div className="col-3 me-auto px-1">
                                            <img
                                                style={{ width: "48px", height: "45px" }}
                                                src="./assets/img/logo-ct-dark.png"
                                                className="navbar-brand-img h-100"
                                                alt="main_logo"
                                            />
                                        </div>

                                    </div>

                                    <div className="card-body">
                                        <form role="form" onSubmit={ProceedLoginusingAPI}>
                                            {/* <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    aria-label="Name"
                                                />
                                            </div> */}
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Tên đăng nhập:
                                            </label>
                                            <div className="mb-3">
                                                <input

                                                    className="form-control"
                                                    placeholder="Tên đăng nhập"
                                                    aria-label="Tên đăng nhập"
                                                    value={username} onChange={e => usernameupdate(e.target.value)}
                                                />
                                            </div>
                                            <label
                                                htmlFor="example-text-input"
                                                className="form-control-label"
                                            >
                                                Mật khẩu:
                                            </label>
                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Mật khẩu"
                                                    aria-label="Mật khẩu"
                                                    value={password} onChange={e => passwordupdate(e.target.value)}
                                                />
                                            </div>
                                            {/* <div className="form-check form-check-info text-start">

                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexCheckDefault"
                                                >
                                                    Bạn chưa có tài khoản. Tạo tài khoản{" "}
                                                    <a
                                                        href="javascript:;"
                                                        className="text-dark font-weight-bolder"
                                                    >
                                                        <Link to='/SignupForm'>Tại Đây</Link>

                                                    </a>
                                                </label>
                                            </div> */}
                                            <div className="text-center" text-color="white">
                                                <button style={{ marginLeft: '-10px' }}
                                                    type="submit"
                                                    className="btn bg-gradient-dark w-100 my-4 mb-2"
                                                >
                                                    Đăng nhập
                                                    {/* <Link to="/Index">Đăng Nhập</Link> */}

                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="footer py-5"></footer>
            </>

        </Fragment>
    )
}
export default Sign_in;




