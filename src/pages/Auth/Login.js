import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { showErrMsg, showSuccessMsg } from "../../utils/Notification";
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

import logo from "../../assets/images/logo-full.png";
import bgimage from "../../assets/images/login-img/pic-5.jpg";
// or
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="container mt-0">
      <div className="row align-items-center justify-contain-center bg-login">
        <div className="col-xl-12 mt-5">
          <div className="card border-0">
            <div className="card-body login-bx">
              <div className="row mt-5">
                <div className="col-xl-8 col-md-6  text-center">
                  <img src={bgimage} className="food-img" alt="" />
                </div>
                <div className="col-xl-4 col-md-6 pe-0">
                  <div className="sign-in-your">
                    <div className="text-center mb-3">
                      <img src={logo} className="mb-3" alt="" />
                      <div></div>
                      <span className="dlab-sign-up">Sign in</span>
                    </div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Email Address</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="johndoe@mail.com"
                          value={email}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="********"
                          value={password}
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="mb-3 text-end">
                        <NavLink to={"/forgot-password"}>
                          Forgot your password?
                        </NavLink>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                    {/* <div className="text-center my-3">
                      <span className="dlab-sign-up style-1">
                        Continue With
                      </span>
                    </div>
                    <div className="d-flex justify-content-center mb-3 dlab-signup-icon">
                      <FacebookLogin
                        appId="Your facebook app id"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                      />
                      <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </div> */}
                    <div className="text-center mt-5">
                      <span>
                        Don't have an account{" "}
                        <NavLink to="/register" className="text-primary">
                          {" "}
                          Sign up
                        </NavLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
