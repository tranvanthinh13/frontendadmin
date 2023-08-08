import { Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { type } from "@testing-library/user-event/dist/type";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupForm() {
    const CLOUDINARY_URL = "cloudinary://188986446376245:b3L-nVDOEx0hxRld1X6qN0sRZ3I@dwkujomo6"

    const [name, setName] = useState('')

    const [image, setImage] = useState();
    const [email, setemail] = useState('');
    const [fullname, setfullname] = useState('')
    const [password, setpassword] = useState('')
    const [checkpass, setpassword2] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [error, setError] = useState('');

    const submitImage = async (event) => {

        if (name.trim() === '') {
            
            return;
        }
        setError('')
        if (password === checkpass) {
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
                const url = 'https://localhost:7225/Authenticate/register-admin';
                const form = {

                    "username": name,
                    "email": email,
                    "password": password,
                    "address": address,
                    "phone": phone,
                    "fullName": fullname,
                    "avatar": Imagepath,
                    "status": true,
                }

                console.log('form: ', form)
                axios.post(url, form)
                    .then((result) => {

                        clear();
                        toast.success('Đã thêm tài khoản');
                    }).catch((error) => {
                        toast.error(error);
                    })

            }


        }





    };
    const clear = () => {
        setName('');
        setemail('');
        setpassword('');
        setaddress('');
        setphone('');
        setfullname('');
        setImage('');
        setpassword('')
        setaddress('')
        setpassword2('')
        // setavatar('');

    }
    return (
        <Fragment>
            {/* <form>
                <h1>Should you have any questions, please do not hesitate to contact me :</h1>
                <div style={{ padding: "40px 30px" }}>
                    <div id="sendmessage"> Your message has been sent successfully. Thank you. </div>
                    <div style={{
                        width: "49.5%",
                        float: "left",
                        borderRight: "1px dotted #CCC",
                        boxSizing: " border-box",
                        padding: " 0px 15px 0px 0px"
                    }}>



                        <div style={{ overflow: "hidden", clear: "both" }}>
                            <p>Name <span>*</span></p>
                            <span style={{ width: '35px', float: "left", borderRadius: "5px 0px 0px 0px 5px", background: "#eeeeee", height: "42px", position: "relative", textAlign: "center", lineHeight: "40px" }}><i className="fa fa-user"></i></span>
                            <input type="text" />
                        
                        </div>



                        <div style={{ overflow: "hidden", clear: "both" }}>
                            <p>E-mail <span>*</span></p>
                            <span className="icon-case"><i className="fa fa-envelope-o"></i></span>
                            <input type="email" />
                           
                        </div>
                        <div style={{ overflow: "hidden", clear: "both" }}>
                            <p>Address <span>*</span></p>
                            <span className="icon-case"><i className="fa fa-location-arrow"></i></span>
                            <input type="text" />
                          
                        </div>
                    </div>

                    <div style={{
                        width: "49.5%",
                        float: "right",
                        boxSizing: "border-box",
                        padding: "0px 0px 0px 15px"
                    }}>
                        <div style={{ overflow: "hidden", clear: "both" }}>
                            <p>Subject</p>
                            <span className="icon-case"><i className="fa fa-comment-o"></i></span>
                            <input type="text" name="subject" />
                           
                        </div>
                        <div style={{ overflow: "hidden", clear: "both" }}>
                            <p>Message</p>
                            <span className="icon-case"><i className="fa fa-comments-o"></i></span>
                            <textarea name="message" />
                        
                        </div>
                    </div>
                </div>
                <button type="button" className="bouton-contact" >Send</button>
            </form> */}


            <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3 navbar-transparent mt-4">
                <div className="container">

                    <button
                        className="navbar-toggler shadow-none ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navigation"
                        aria-controls="navigation"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon mt-2">
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navigation">

                    </div>
                </div>
            </nav>

            <main className="main-content  mt-0">
                <div
                    className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
                    style={{
                        backgroundImage:
                            'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg")',
                        backgroundPosition: "full"
                    }}
                >
                    <span className="mask bg-gradient-dark opacity-6" />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 text-center mx-auto">
                                <h1 className="text-white mb-2 mt-5">Đăng ký</h1>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
                        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                            <div style={{ width: "831px", marginLeft: "-198px" }} className="card z-index-0">

                                <div className="card-body">
                                    <form >
                                        <div style={{
                                            width: "49.5%",
                                            float: "left",
                                            borderRight: "1px dotted #CCC",
                                            boxSizing: " border-box",
                                            padding: " 0px 15px 0px 0px"
                                        }}>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Tên đăng nhập:
                                                </label>
                                                <input
                                                    className="form-control"
                                                    value={name} onChange={(e) => setName(e.target.value)}
                                                />
                                               
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Họ và tên(đầy đủ):
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={fullname} onChange={(e) => setfullname(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Email:
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={email} onChange={(e) => setemail(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Số điện thoại:
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={phone} onChange={(e) => setphone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div style={{
                                            width: "49.5%",
                                            float: "right",
                                            boxSizing: "border-box",
                                            padding: "0px 0px 0px 15px"
                                        }}>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Địa chỉ:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={address} onChange={(e) => setaddress(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Ảnh:
                                                </label>
                                                <input className="form-control" type="file" onChange={(e) => {

                                                    setImage(e.target.files[0])
                                                }} />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Mật khẩu:
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    value={password} onChange={(e) => setpassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="example-text-input"
                                                    className="form-control-label"
                                                >
                                                    Nhập lại mật khẩu:
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    value={checkpass} onChange={(e) => setpassword2(e.target.value)}
                                                />
                                            </div>

                                        </div>




                                        <div className="form-check form-check-info text-start">

                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Quay lại trang {" "}
                                                <a
                                                    href="javascript:;"
                                                    className="text-dark font-weight-bolder"
                                                >
                                                    <Link to='/'>Đăng nhập</Link>

                                                </a>
                                            </label>
                                        </div>

                                        <div className="text-center">
                                            <button
                                                style={{ marginLeft: '-10px' }}
                                                type="button"
                                                className="btn bg-gradient-dark w-100 my-4 mb-2"
                                                onClick={() => submitImage()}
                                            >
                                                Đăng ký


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


        </Fragment>
    )
}

export default SignupForm
